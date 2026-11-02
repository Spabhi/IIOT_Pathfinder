/* IIoT Pathfinder – Zero-to-Hero Learning Engine, Gated Quizzes & Certification Readiness Evaluator */
const RAW_MODULES = [...(window.MODULES_PART1 || []), ...(window.MODULES_PART2 || [])];
const Z2H = window.ZERO_TO_HERO || {};
const CERTS = window.CERTIFICATIONS || [];

const MODULES = RAW_MODULES.map((m, idx) => {
  const z = Z2H[m.id] || {};
  const mergedQuiz = [...m.quiz, ...(z.extraQuiz || [])];
  return { ...m, index: idx, z2h: z, quiz: mergedQuiz };
});
const MOD_BY_ID = Object.fromEntries(MODULES.map(m => [m.id, m]));

const PASS = 0.8;
const KEY = "iiot-pathfinder-progress";
let state = JSON.parse(localStorage.getItem(KEY) || '{"passed":{},"scores":{},"labs":{}}');
if (!state.passed) state.passed = {};
if (!state.scores) state.scores = {};
if (!state.labs) state.labs = {};
const save = () => localStorage.setItem(KEY, JSON.stringify(state));

const isUnlocked = i => i === 0 || !!state.passed[MODULES[i - 1].id];
const $ = s => document.querySelector(s);

/* Helper: extract individual <li> items from lab HTML so learners can check them off interactively */
function extractLabSteps(html) {
  const matches = [...html.matchAll(/<li>([\s\S]*?)<\/li>/gi)];
  return matches.map(m => m[1]);
}

/* Evaluate a single certification against the learner's current completed modules, quiz scores & labs */
function evaluateCert(cert) {
  const reqIds = cert.requiredModules || [];
  const passedIds = reqIds.filter(id => !!state.passed[id]);
  const missingIds = reqIds.filter(id => !state.passed[id]);
  const allPassed = missingIds.length === 0 && reqIds.length > 0;
  const avgScore = passedIds.length
    ? Math.round(passedIds.reduce((sum, id) => sum + (state.scores[id] || 80), 0) / passedIds.length)
    : 0;
  const progressPct = reqIds.length ? Math.round((passedIds.length / reqIds.length) * 100) : 0;

  let labDone = 0, labTotal = 0;
  reqIds.forEach(id => {
    const mod = MOD_BY_ID[id];
    if (!mod) return;
    const steps = extractLabSteps(mod.lab.html);
    labTotal += steps.length;
    const modLabs = state.labs[id] || {};
    steps.forEach((_, idx) => { if (modLabs[idx]) labDone++; });
  });
  const labPct = labTotal ? Math.round((labDone / labTotal) * 100) : 0;

  let status = "LOCKED";
  if (allPassed && avgScore >= cert.minAvgScore) status = "READY";
  else if (allPassed && avgScore < cert.minAvgScore) status = "BOOST";
  else if (passedIds.length > 0) status = "PROGRESS";

  return {
    ...cert,
    passedIds,
    missingIds,
    allPassed,
    avgScore,
    progressPct,
    labDone,
    labTotal,
    labPct,
    status
  };
}

function evaluateAllCerts() {
  return CERTS.map(evaluateCert);
}

function getProfileRank() {
  const n = Object.keys(state.passed).length;
  if (n === 0) return { title: "Stage 0 · Explorer (Zero Prior Experience)", desc: "Begin Module 0 to start building your verified IIoT & Enterprise engineering profile." };
  if (n < 4) return { title: "Stage 1 · IIoT Foundations & Java Associate", desc: "You understand ISA-95/Purdue architecture, industrial networking, and core Java programming." };
  if (n < 8) return { title: "Stage 2 · IT & Mainframe Integration Specialist", desc: "You can bridge Java applications with enterprise IBM Z mainframes (z/OS, JCL, PL/I, IBM MQ)." };
  if (n < 12) return { title: "Stage 3 · OT Connectivity & Unified Namespace Engineer", desc: "You speak shop-floor OT protocols (PLCs, Modbus, OPC UA, MQTT & Sparkplug B)." };
  if (n < 16) return { title: "Stage 4 · Edge & Industrial Data Platform Engineer", desc: "You can deploy containerized edge gateways (Docker/K3s), TSDBs, and Kafka broker fabrics." };
  if (n < 20) return { title: "Stage 5 · Senior IIoT Cloud, Security & AI Specialist", desc: "You cover cloud digital twins, IEC 62443 security, and edge predictive maintenance." };
  return { title: "Stage 6 · Full-Stack IIoT Solutions Architect (Path Complete 🏆)", desc: "Your profile spans Level 0 sensors to Level 4 mainframe ERP and Cloud Digital Twins." };
}

function renderNav(activeView) {
  const evals = evaluateAllCerts();
  const readyCount = evals.filter(c => c.status === "READY").length;
  const inProgCount = evals.filter(c => c.status === "PROGRESS" || c.status === "BOOST").length;

  $("#certBadgeSummary").innerHTML = `
    <div class="cert-mini-pill" id="pillReady" title="View Exam-Ready Certifications">
      <b>🏅 ${readyCount}</b><span>Exam-Ready Certs</span>
    </div>
    <div class="cert-mini-pill" id="pillProg" title="View In-Progress Certifications">
      <b style="color:var(--blue)">📈 ${inProgCount}</b><span>In Progress</span>
    </div>`;
  $("#pillReady").onclick = () => renderCertifications("READY");
  $("#pillProg").onclick = () => renderCertifications("ALL");

  let html = "", phase = "";
  MODULES.forEach((m, i) => {
    if (m.phase !== phase) { phase = m.phase; html += `<div class="phase">${phase}</div>`; }
    const done = state.passed[m.id], unl = isUnlocked(i);
    const st = done ? "✅" : unl ? m.icon : "🔒";
    const sc = state.scores[m.id] ? `<span class="nav-score">${state.scores[m.id]}%</span>` : "";
    html += `<div class="nav-item ${unl ? "" : "locked"} ${activeView === m.id ? "active" : ""}" data-i="${i}">
      <span class="st">${st}</span><span>${i}. ${m.title}</span>${sc}
    </div>`;
  });

  $("#moduleNav").innerHTML =
    `<div class="nav-item ${activeView === "HOME" ? "active" : ""}" data-home="1"><span class="st">🏠</span><span>Roadmap overview</span></div>` +
    `<div class="nav-item ${activeView === "CERTS" ? "active" : ""}" data-certs="1"><span class="st">🏅</span><span>Certifications &amp; Profile</span><span class="nav-score" style="color:#f2cc60">${readyCount}/${CERTS.length}</span></div>` +
    html;

  document.querySelectorAll(".nav-item").forEach(el => el.onclick = () => {
    if (el.dataset.home) return renderHome();
    if (el.dataset.certs) return renderCertifications("ALL");
    const i = +el.dataset.i; if (isUnlocked(i)) renderModule(i);
  });

  const pct = Math.round(Object.keys(state.passed).length / MODULES.length * 100);
  $("#progressPct").textContent = pct + "%";
  $("#progressBar").style.width = pct + "%";
}

function renderHome() {
  renderNav("HOME");
  const next = MODULES.findIndex(m => !state.passed[m.id]);
  const evals = evaluateAllCerts();
  const readyCerts = evals.filter(c => c.status === "READY");
  const rank = getProfileRank();

  $("#main").innerHTML = `
  <div class="hero">
    <span class="tag green">🌱 Zero Prior Experience Required</span>
    <span class="tag">${MODULES.length} Modules · ${MODULES.reduce((a, m) => a + m.quiz.length, 0)} Quiz Questions</span>
    <span class="tag">⏱ ≈ ${MODULES.reduce((a, m) => a + m.hours, 0)} Study Hours</span>
    <span class="tag amber">🏅 ${CERTS.length} Mapped Industry Certifications</span>
    <h2>From Zero Experience to Competent, Exam-Ready IIoT Engineer</h2>
    <p>Designed specifically for smart, motivated learners with <b>no prior background</b> in industrial automation, Java, or mainframes. Every module starts with a <b>plain-English mental model &amp; jargon decoder</b>, guides you through a <b>hands-on laptop lab using free simulators</b>, builds a <b>quantified resume &amp; GitHub portfolio artifact</b>, and evaluates your profile's readiness for <b>official industry certifications</b> as soon as you pass each quiz.</p>
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px">
      <button id="go">${next === -1 ? "🎓 Path completed – Review Modules" : next === 0 ? "Start Module 0 (Zero-to-Hero) →" : "Continue: " + next + ". " + MODULES[next].title + " →"}</button>
      <button class="secondary" id="goCerts">🏅 View My Certification &amp; Competency Profile (${readyCerts.length} Exam-Ready)</button>
    </div>
  </div>

  <div class="card" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
    <div>
      <small style="color:var(--accent);text-transform:uppercase;font-weight:700">Current Competency Standing</small>
      <h4 style="margin:4px 0;color:var(--text);font-size:18px">${rank.title}</h4>
      <p style="margin:0;font-size:14px;color:var(--muted)">${rank.desc}</p>
    </div>
    <div style="text-align:right">
      <span class="tag green">${Object.keys(state.passed).length} / ${MODULES.length} Modules Passed</span>
      <span class="tag blue">${readyCerts.length} / ${CERTS.length} Certs Exam-Ready</span>
    </div>
  </div>

  <h3>Reference Architecture You Will Master Step-by-Step</h3>
  <pre>
 [Level 0: Sensors/Actuators (4-20mA)] → [Level 1: PLC / Soft-PLC (IEC 61131-3)]
                                                  │  Modbus TCP / S7 / PROFINET / EtherNet-IP
                                                  ▼
     [Level 2: OPC UA Server] ⇄ [Edge Gateway: Java (Milo/PLC4X) · Node-RED · Docker/K3s]
                                                  │  Outbound mTLS (Level 3.5 DMZ · IEC 62443)
                                                  │  MQTT + Sparkplug B (ISO/IEC 20237)
                                                  ▼
              [Unified Namespace &amp; Broker Fabric: HiveMQ / EMQX ⇄ Apache Kafka]
                   │                              │                              │
        [Time-Series Historian]        [Cloud &amp; Digital Twins]        [Mainframe Enterprise ERP]
       (Telegraf → InfluxDB/Grafana)  (AWS/Azure · AAS BaSyx · ONNX)  (IBM MQ → z/OS · CICS · JCL · PL/I)</pre>

  <h3>Complete 20-Module Roadmap</h3>
  <div class="grid">${MODULES.map((m, i) => {
    const done = state.passed[m.id], unl = isUnlocked(i);
    const certCount = CERTS.filter(c => c.requiredModules.includes(m.id)).length;
    return `<div class="mini ${unl ? "" : "locked"}" data-i="${i}">
      <b>${done ? "✅" : unl ? m.icon : "🔒"} ${i}. ${m.title}</b>
      <small>${m.phase} · ${m.hours} h · ${m.level}</small>
      <div style="margin-top:6px">
        ${done ? `<span class="tag green">Score: ${state.scores[m.id]}%</span>` : ""}
        <span class="tag" style="font-size:11px">🏅 Feeds ${certCount} cert${certCount > 1 ? "s" : ""}</span>
      </div>
    </div>`;
  }).join("")}</div>`;

  $("#go").onclick = () => renderModule(next === -1 ? 0 : next);
  $("#goCerts").onclick = () => renderCertifications("ALL");
  document.querySelectorAll(".mini").forEach(el => el.onclick = () => {
    const i = +el.dataset.i; if (isUnlocked(i)) renderModule(i);
  });
  window.scrollTo(0, 0);
}

function renderModule(i, tab = "primer") {
  const m = MODULES[i];
  renderNav(m.id);
  const score = state.scores[m.id];
  const z = m.z2h || {};
  const relatedCerts = evaluateAllCerts().filter(c => c.requiredModules.includes(m.id));
  const readyCount = relatedCerts.filter(c => c.status === "READY").length;

  $("#main").innerHTML = `
  <div>
    <span class="tag">${m.phase}</span>
    <span class="tag blue">${m.level} (Zero-Exp Friendly)</span>
    <span class="tag">⏱ ${m.hours} h</span>
    <span class="tag amber">🏅 Feeds ${relatedCerts.length} Certification${relatedCerts.length > 1 ? "s" : ""}${readyCount ? ` (${readyCount} Exam-Ready!)` : ""}</span>
    ${state.passed[m.id] ? `<span class="tag green">✅ Passed (${score}%)</span>` : ""}
  </div>
  <h2>${m.icon} ${i}. ${m.title}</h2>
  <p>${m.summary}</p>
  <div class="card"><b>🎯 What you will be able to do after this module:</b><ul class="objectives">${m.objectives.map(o => `<li>${o}</li>`).join("")}</ul></div>

  <div class="tabs">
    ${[
      ["primer", "🌱 1. Start Here (Zero-Exp Primer)"],
      ["lessons", "📘 2. Technical Deep-Dive"],
      ["lab", "🛠 3. Interactive Lab & Portfolio"],
      ["resources", "🔗 4. Free Resources"],
      ["quiz", `📝 5. Quiz & Cert Check (${m.quiz.length} Qs)`]
    ].map(([k, l]) => `<div class="tab ${k === tab ? "active" : ""}" data-t="${k}">${l}</div>`).join("")}
  </div>
  <div class="tabpanel" id="panel"></div>
  <div class="navbtns">
    <button class="ghost" style="width:auto" id="prev" ${i === 0 ? "disabled" : ""}>← Previous Module</button>
    <button id="next" ${i < MODULES.length - 1 && state.passed[m.id] ? "" : "disabled"}>Next Module →</button>
  </div>`;

  document.querySelectorAll(".tab").forEach(t => t.onclick = () => renderModule(i, t.dataset.t));
  $("#prev").onclick = () => renderModule(i - 1);
  $("#next").onclick = () => renderModule(i + 1);

  const p = $("#panel");
  if (tab === "primer") renderPrimerTab(i, m, z, relatedCerts, p);
  if (tab === "lessons") renderLessonsTab(i, m, z, p);
  if (tab === "lab") renderLabTab(i, m, z, p);
  if (tab === "resources") renderResourcesTab(i, m, p);
  if (tab === "quiz") renderQuiz(i, p);
  window.scrollTo(0, 0);
}

function renderPrimerTab(i, m, z, relatedCerts, p) {
  p.innerHTML = `
    <div class="analogy-card">
      <h4>💡 Plain-English Mental Model (For Zero Prior Experience)</h4>
      <p style="margin:0;font-size:15px">${z.analogy || m.summary}</p>
    </div>

    ${z.glossary ? `
    <h3>📖 Jargon Decoder – Plain-English Glossary</h3>
    <p>New to this field? Read this table first so every technical term in the lessons feels familiar:</p>
    <table>
      <tr><th style="width:28%">Term / Acronym</th><th>What It Actually Means in Plain English</th></tr>
      ${z.glossary.map(([term, def]) => `<tr><td><b>${term}</b></td><td>${def}</td></tr>`).join("")}
    </table>` : ""}

    ${z.beginnerGuide ? `
    <h3>🧭 Step-by-Step Beginner Orientation</h3>
    <div class="primer-guide">${z.beginnerGuide}</div>` : ""}

    <h3>🏅 Industry Certifications Connected to This Module</h3>
    <p>Passing this module's quiz (and meeting the required mastery score) builds and qualifies your profile toward these industry credentials:</p>
    ${relatedCerts.map(c => renderCompactCertCard(c)).join("")}

    <p style="margin-top:24px"><button onclick="document.querySelector('[data-t=lessons]').click()">Continue to Technical Deep-Dive Lessons →</button></p>
  `;
}

function renderLessonsTab(i, m, z, p) {
  p.innerHTML = `
    <div class="card" style="background:var(--panel2);padding:12px 18px;font-size:13.5px">
      💡 <b>Tip for Beginners:</b> Keep the <a href="#" id="backPrimer" style="color:var(--blue)">🌱 Zero-Exp Primer &amp; Jargon Decoder</a> in mind as you read each technical section below.
    </div>
    ${m.lessons.map((l, k) => `<h3>${k + 1}. ${l.title}</h3>${l.html}`).join("")}
    ${z.profile ? `
    <div class="interview-box" style="margin-top:26px">
      <h4 style="margin-top:0;color:var(--purple)">🎤 How to Sound Like an Expert in Interviews (Real Interview Q&amp;A)</h4>
      <p><b>Question:</b> <i>"${z.profile.interviewQ}"</i></p>
      <p style="margin-bottom:0"><b>Model Engineer Answer:</b> ${z.profile.interviewA}</p>
    </div>` : ""}
    <p style="margin-top:24px"><button onclick="document.querySelector('[data-t=lab]').click()">Continue to Interactive Lab &amp; Portfolio →</button></p>
  `;
  if ($("#backPrimer")) $("#backPrimer").onclick = (e) => { e.preventDefault(); renderModule(i, "primer"); };
}

function renderLabTab(i, m, z, p) {
  const steps = extractLabSteps(m.lab.html);
  const modLabs = state.labs[m.id] || {};
  const doneCount = steps.filter((_, idx) => !!modLabs[idx]).length;

  p.innerHTML = `
    <div class="card lab">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
        <h3 style="margin:0;border:none">${m.lab.title}</h3>
        <span class="tag green" id="labCounter">${doneCount} / ${steps.length} Milestones Checked</span>
      </div>
      <p style="font-size:13.5px;color:var(--muted);margin:6px 0 12px">Check off each milestone as you complete it on your machine. Practical completion strengthens your Certification &amp; Profile Readiness!</p>
      <ul class="lab-checklist">
        ${steps.map((s, idx) => `
          <li class="${modLabs[idx] ? "done" : ""}" data-step="${idx}">
            <input type="checkbox" ${modLabs[idx] ? "checked" : ""} />
            <div><b>Step ${idx + 1}:</b> ${s}</div>
          </li>`).join("")}
      </ul>
    </div>

    ${z.profile ? `
    <div class="card">
      <h3 style="margin-top:0">💼 Competency &amp; Portfolio Builder</h3>
      <p><b>Skills Unlocked by This Module:</b></p>
      <div>${z.profile.skills.map(s => `<span class="skill-chip">✔ ${s}</span>`).join("")}</div>
      <h4>📦 GitHub Portfolio Deliverable</h4>
      <p>${z.profile.deliverable}</p>
      <h4>📄 Quantified CV / Resume Bullet (Unlocked on Passing Quiz)</h4>
      <div class="resume-box">• ${z.profile.resumeBullet}</div>
    </div>` : ""}

    <button onclick="document.querySelector('[data-t=resources]').click()">Continue to Free Open Resources →</button>
  `;

  p.querySelectorAll(".lab-checklist li").forEach(li => {
    li.onclick = (e) => {
      const idx = +li.dataset.step;
      if (!state.labs[m.id]) state.labs[m.id] = {};
      if (e.target.tagName !== "INPUT") {
        const cb = li.querySelector("input");
        cb.checked = !cb.checked;
        state.labs[m.id][idx] = cb.checked;
      } else {
        state.labs[m.id][idx] = e.target.checked;
      }
      li.classList.toggle("done", !!state.labs[m.id][idx]);
      save();
      const updatedDone = steps.filter((_, k) => !!state.labs[m.id][k]).length;
      $("#labCounter").textContent = `${updatedDone} / ${steps.length} Milestones Checked`;
    };
  });
}

function renderResourcesTab(i, m, p) {
  p.innerHTML = `
    <h3>🔗 Curated Free &amp; Open Learning Platforms</h3>
    <p>Use these official documentation portals, free simulators, and interactive sandboxes to deepen your understanding:</p>
    <ul class="res">${m.resources.map(r => `<li><a href="${r.url}" target="_blank" rel="noopener"><b>${r.name}</b> ↗</a>${r.note ? " – " + r.note : ""}</li>`).join("")}</ul>
    <p style="margin-top:24px"><button onclick="document.querySelector('[data-t=quiz]').click()">Take the Checkpoint Quiz &amp; Evaluate Certification Readiness →</button></p>
  `;
}

function renderCompactCertCard(c) {
  const badgeMap = {
    READY: `<span class="status-badge ready">🟢 Profile Fit for Exam (${c.avgScore}% Avg)</span>`,
    BOOST: `<span class="status-badge boost">🟡 Score Boost Recommended (${c.avgScore}% vs ${c.minAvgScore}% req)</span>`,
    PROGRESS: `<span class="status-badge progress">🔵 In Progress (${c.passedIds.length}/${c.requiredModules.length} Modules)</span>`,
    LOCKED: `<span class="status-badge locked">🔒 Requires ${c.requiredModules.length} Module${c.requiredModules.length > 1 ? "s" : ""} (≥${c.minAvgScore}% Avg)</span>`
  };
  const cls = c.status === "READY" ? "ready" : c.status === "BOOST" ? "boost" : c.status === "PROGRESS" ? "progress" : "";
  return `
    <div class="cert-card ${cls}">
      <div class="cert-header">
        <div>
          <span class="tag purple">${c.tier}</span>
          <span class="tag">${c.provider}</span>
          <span class="tag ${c.cost.includes("Free") ? "green" : "amber"}">💳 ${c.cost}</span>
          <div class="cert-title">${c.title}</div>
        </div>
        ${badgeMap[c.status]}
      </div>
      <div class="mod-req-list">
        ${c.requiredModules.map(id => {
          const mod = MOD_BY_ID[id];
          const done = !!state.passed[id];
          const sc = state.scores[id];
          return `<span class="mod-req-pill ${done ? "done" : "todo"}">${done ? "✅" : "⬜"} ${mod ? mod.index + ". " + mod.title : id}${done ? ` (${sc}%)` : ""}</span>`;
        }).join("")}
      </div>
      <p style="font-size:13.5px;margin:6px 0">${c.whyItMatters}</p>
    </div>`;
}

function renderFullCertCard(c, highlightNew = false) {
  const badgeMap = {
    READY: `<span class="status-badge ready">🟢 Exam-Ready · Profile Fit Confirmed</span>`,
    BOOST: `<span class="status-badge boost">🟡 Modules Passed · Needs ≥${c.minAvgScore}% Avg Score</span>`,
    PROGRESS: `<span class="status-badge progress">🔵 Building Readiness (${c.progressPct}%)</span>`,
    LOCKED: `<span class="status-badge locked">🔒 Locked (${c.requiredModules.length} Prerequisite Modules)</span>`
  };
  const cls = c.status === "READY" ? "ready" : c.status === "BOOST" ? "boost" : c.status === "PROGRESS" ? "progress" : "";

  return `
    <div class="cert-card ${cls}">
      <div class="cert-header">
        <div>
          ${highlightNew && c.status === "READY" ? `<span class="tag green">🎉 PROFILE DEEMED FIT FOR EXAM!</span>` : ""}
          <span class="tag purple">${c.tier}</span>
          <span class="tag">${c.category}</span>
          <span class="tag ${c.cost.includes("Free") ? "green" : "amber"}">💳 ${c.cost}</span>
          <div class="cert-title">${c.title}</div>
          <small style="color:var(--muted)">Provider: <b>${c.provider}</b> · Format: ${c.examFormat} · Typical Prep: ${c.prepHours}</small>
        </div>
        ${badgeMap[c.status]}
      </div>

      <div class="fitness-bar-wrap">
        <div style="display:flex;justify-content:space-between;font-size:12.5px">
          <span><b>Module Coverage:</b> ${c.passedIds.length}/${c.requiredModules.length} (${c.progressPct}%)</span>
          <span><b>Quiz Mastery Avg:</b> <b style="color:${c.avgScore >= c.minAvgScore ? "var(--accent2)" : "var(--yellow)"}">${c.passedIds.length ? c.avgScore + "%" : "—"}</b> (Exam Fit Target: ≥${c.minAvgScore}%)</span>
          <span><b>Lab Milestones:</b> ${c.labDone}/${c.labTotal} (${c.labPct}%)</span>
        </div>
        <div class="fitness-bar"><div class="fitness-fill" style="width:${c.progressPct}%"></div></div>
      </div>

      <div class="mod-req-list">
        ${c.requiredModules.map(id => {
          const mod = MOD_BY_ID[id];
          const done = !!state.passed[id];
          const sc = state.scores[id];
          return `<span class="mod-req-pill ${done ? "done" : "todo"}">${done ? "✅" : "⬜"} ${mod ? mod.index + ". " + mod.title : id}${done ? ` (${sc}%)` : ""}</span>`;
        }).join("")}
      </div>

      ${c.status === "READY" ? `
        <div style="background:#0d1f14;border:1px solid #238636;border-radius:8px;padding:12px 14px;margin:10px 0;font-size:13.5px">
          ✅ <b>Why Your Profile Is Fit to Appear:</b> You have completed 100% of the prerequisite modules with an average mastery score of <b>${c.avgScore}%</b> (exceeding the <b>${c.minAvgScore}%</b> exam readiness benchmark).<br/>
          💡 <b>Exam Readiness Tip:</b> ${c.readinessTip}
        </div>` : ""}

      ${c.status === "BOOST" ? `
        <div style="background:#261d0f;border:1px solid var(--yellow);border-radius:8px;padding:12px 14px;margin:10px 0;font-size:13.5px">
          ⚠️ <b>Almost Fit to Appear:</b> You passed all prerequisite modules, but your current average quiz score is <b>${c.avgScore}%</b>. Because <b>${c.title}</b> is a ${c.tier}-level credential, our readiness evaluator recommends an average mastery of <b>≥${c.minAvgScore}%</b>. Retake the quiz on your lowest-scoring prerequisite module above to confirm exam fitness!
        </div>` : ""}

      ${c.status === "PROGRESS" ? `
        <div style="font-size:13px;color:var(--muted);margin:8px 0">
          🔜 <b>Remaining to Qualify for Exam:</b> Complete ${c.missingIds.map(id => `<b>${MOD_BY_ID[id].index}. ${MOD_BY_ID[id].title}</b>`).join(", ")} with an overall average of ≥${c.minAvgScore}%.
        </div>` : ""}

      <details style="margin-top:10px;font-size:13.5px">
        <summary style="cursor:pointer;color:var(--blue);font-weight:600">📋 View Exam Domains Covered &amp; Career Impact</summary>
        <p style="margin:8px 0"><b>Why Hiring Managers Value This:</b> ${c.whyItMatters}</p>
        <ul style="margin:6px 0">${c.domains.map(d => `<li>${d}</li>`).join("")}</ul>
      </details>

      <div style="margin-top:12px;display:flex;gap:10px;flex-wrap:wrap">
        <a href="${c.url}" target="_blank" rel="noopener"><button class="${c.status === "READY" ? "" : "secondary"}" style="padding:7px 14px;font-size:13px">${c.status === "READY" ? "🎓 Appear for Exam / Claim Official Badge ↗" : "🔗 View Official Exam Syllabus ↗"}</button></a>
      </div>
    </div>`;
}

function renderQuiz(i, p) {
  const m = MODULES[i];
  const minCorrect = Math.ceil(m.quiz.length * PASS);
  p.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
      <h3 style="margin:0;border:none">📝 Checkpoint &amp; Certification Readiness Quiz</h3>
      <div>
        <span class="tag">${m.quiz.length} Questions</span>
        <span class="tag green">Pass to Unlock Next Module: ${minCorrect}/${m.quiz.length} (${PASS * 100}%)</span>
        <span class="tag amber">🏅 High-Confidence Exam Fit: ≥85%</span>
      </div>
    </div>
    <p style="font-size:14px;color:var(--muted)">Complete this quiz to unlock the next module and run the <b>Certification &amp; Profile Fitness Evaluator</b>.</p>` +
    m.quiz.map((q, k) => `<div class="q" id="q${k}"><p>${k + 1}. ${q.q}</p>${q.options.map((o, j) => `<label class="opt"><input type="radio" name="q${k}" value="${j}">${o}</label>`).join("")}<div class="explain" hidden></div></div>`).join("") +
    `<button id="submit">Submit Answers &amp; Evaluate Certification Readiness</button><div id="result"></div>`;

  $("#submit").onclick = () => {
    let correct = 0, answered = 0;
    m.quiz.forEach((q, k) => {
      const sel = p.querySelector(`input[name=q${k}]:checked`);
      if (sel) answered++;
    });
    if (answered < m.quiz.length) {
      $("#result").innerHTML = `<div class="result fail">⚠️ Please answer all questions before submitting (${answered}/${m.quiz.length} answered).</div>`;
      return;
    }

    m.quiz.forEach((q, k) => {
      const sel = p.querySelector(`input[name=q${k}]:checked`);
      const labels = p.querySelectorAll(`#q${k} .opt`);
      labels.forEach((l, j) => { l.classList.remove("correct", "wrong"); if (j === q.a) l.classList.add("correct"); });
      if (sel && +sel.value === q.a) correct++; else if (sel) labels[+sel.value].classList.add("wrong");
      const ex = p.querySelector(`#q${k} .explain`); ex.hidden = false; ex.textContent = "💡 " + q.why;
    });

    const pct = Math.round(correct / m.quiz.length * 100);
    const pass = correct / m.quiz.length >= PASS;
    if (pass) {
      state.passed[m.id] = true;
      state.scores[m.id] = Math.max(pct, state.scores[m.id] || 0);
      save();
    }

    /* Evaluate certifications connected to this module & overall profile */
    const allEvals = evaluateAllCerts();
    const modCerts = allEvals.filter(c => c.requiredModules.includes(m.id));
    const readyModCerts = modCerts.filter(c => c.status === "READY");
    const boostModCerts = modCerts.filter(c => c.status === "BOOST");
    const progModCerts = modCerts.filter(c => c.status === "PROGRESS");
    const totalReady = allEvals.filter(c => c.status === "READY").length;
    const z = m.z2h || {};

    let certHtml = "";
    if (pass) {
      certHtml = `
      <div class="cert-eval-wrap">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
          <h3 style="margin:0;border:none;color:var(--accent)">🏅 Certification &amp; Profile Fitness Assessment</h3>
          <button class="secondary" id="openPassportBtn" style="font-size:13px;padding:7px 14px">Open Full Certification Passport (${totalReady} Exam-Ready) →</button>
        </div>
        <p style="font-size:14px;color:var(--muted)">Based on your completed modules and your <b>${ state.scores[m.id] }%</b> mastery score in <b>${m.title}</b>, here is your updated eligibility for industry certification exams:</p>

        ${readyModCerts.length ? `
          <h4 style="color:var(--accent2)">🟢 Profile Deemed Fit to Appear for Exam (${readyModCerts.length} Unlocked!)</h4>
          ${readyModCerts.map(c => renderFullCertCard(c, true)).join("")}
        ` : ""}

        ${boostModCerts.length ? `
          <h4 style="color:var(--yellow)">🟡 Prerequisite Modules Complete — Score Boost Recommended Before Exam</h4>
          ${boostModCerts.map(c => renderFullCertCard(c, false)).join("")}
        ` : ""}

        ${progModCerts.length ? `
          <h4 style="color:var(--blue)">📈 Multi-Module Certifications Advanced by This Module</h4>
          ${progModCerts.map(c => renderFullCertCard(c, false)).join("")}
        ` : ""}

        ${z.profile ? `
          <div class="card" style="border-color:var(--accent2);margin-top:16px">
            <h4 style="margin-top:0;color:var(--accent2)">💼 Added to Your Competent Engineer Profile</h4>
            <div style="margin-bottom:8px">${z.profile.skills.map(s => `<span class="skill-chip">✔ ${s}</span>`).join("")}</div>
            <div style="font-size:13px;color:var(--muted)">Unlocked CV / Resume Bullet:</div>
            <div class="resume-box">• ${z.profile.resumeBullet}</div>
          </div>
        ` : ""}
      </div>`;
    } else {
      certHtml = `
      <div class="cert-eval-wrap">
        <h4 style="color:var(--muted);margin-top:0">🔒 Certification Fitness Evaluation Pending</h4>
        <p style="font-size:13.5px;color:var(--muted)">Score at least <b>${PASS * 100}% (${minCorrect}/${m.quiz.length})</b> on this quiz to unlock the next module and evaluate your eligibility for: ${modCerts.map(c => `<b>${c.title}</b>`).join(", ")}.</p>
      </div>`;
    }

    $("#result").innerHTML = (pass
      ? `<div class="result pass">🎉 Score: ${correct}/${m.quiz.length} (${pct}%) — Module Passed! ${i < MODULES.length - 1 ? "Unlocked next module: <b>" + (i + 1) + ". " + MODULES[i + 1].title + "</b>" : "You have completed all 20 modules of the IIoT Pathfinder! 🎓"}</div>
         <div style="display:flex;gap:10px;flex-wrap:wrap">
           ${i < MODULES.length - 1 ? '<button id="goNext">Continue to Next Module →</button>' : ""}
           ${pct < 100 ? '<button class="secondary" id="retry">Retake Quiz to Boost Mastery Score</button>' : ""}
         </div>`
      : `<div class="result fail">Score: ${correct}/${m.quiz.length} (${pct}%) — Pass mark is ${PASS * 100}% (${minCorrect}/${m.quiz.length}). Review the 💡 explanations above and the Zero-to-Hero Primer, then retry!</div>
         <button id="retry">Retry Quiz</button>`) + certHtml;

    renderNav(m.id);
    $("#submit").disabled = true;
    if ($("#goNext")) $("#goNext").onclick = () => renderModule(i + 1);
    if ($("#retry")) $("#retry").onclick = () => renderQuiz(i, p);
    if ($("#openPassportBtn")) $("#openPassportBtn").onclick = () => renderCertifications("ALL");
    if (pass) $("#next").disabled = i >= MODULES.length - 1;
  };
}

function renderCertifications(filter = "ALL") {
  renderNav("CERTS");
  const evals = evaluateAllCerts();
  const ready = evals.filter(c => c.status === "READY");
  const boost = evals.filter(c => c.status === "BOOST");
  const prog = evals.filter(c => c.status === "PROGRESS");
  const rank = getProfileRank();
  const passedMods = MODULES.filter(m => state.passed[m.id]);
  const avgAll = passedMods.length
    ? Math.round(passedMods.reduce((s, m) => s + (state.scores[m.id] || 80), 0) / passedMods.length)
    : 0;

  let filtered = evals;
  if (filter === "READY") filtered = evals.filter(c => c.status === "READY");
  if (filter === "PROGRESS") filtered = evals.filter(c => c.status === "PROGRESS" || c.status === "BOOST");
  if (filter === "FREE") filtered = evals.filter(c => c.cost.toLowerCase().includes("free"));
  if (filter === "PAID") filtered = evals.filter(c => !c.cost.toLowerCase().includes("100% free"));

  /* Compute phase domain mastery bars */
  const phases = [...new Set(MODULES.map(m => m.phase))];
  const domainHtml = phases.map(ph => {
    const pMods = MODULES.filter(m => m.phase === ph);
    const pDone = pMods.filter(m => state.passed[m.id]);
    const pct = Math.round((pDone.length / pMods.length) * 100);
    return `<div class="domain-box">
      <div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:6px">
        <b>${ph}</b><span style="color:var(--accent2)">${pDone.length}/${pMods.length} (${pct}%)</span>
      </div>
      <div class="fitness-bar"><div class="fitness-fill" style="width:${pct}%"></div></div>
    </div>`;
  }).join("");

  $("#main").innerHTML = `
    <div class="hero">
      <span class="tag green">🟢 ${ready.length} Exam-Ready</span>
      <span class="tag amber">🟡 ${boost.length} Needs Score Boost</span>
      <span class="tag blue">🔵 ${prog.length} In Progress</span>
      <span class="tag">📊 Overall Quiz Mastery Avg: ${passedMods.length ? avgAll + "%" : "—"}</span>
      <h2>🏅 Certification Readiness &amp; Candidate Competency Passport</h2>
      <p>As you complete modules and pass quizzes, our readiness engine evaluates your mastery score against the syllabus of <b>${CERTS.length} industry certifications and free verifiable badges</b> (IBM, Oracle, HiveMQ, Inductive Automation, Linux Foundation/CNCF, ISA/IEC 62443, InfluxData, Confluent, AWS/Azure).</p>
    </div>

    <div class="card">
      <h3 style="margin-top:0">🧭 Your IIoT Engineer Profile Standing: <span style="color:var(--accent)">${rank.title}</span></h3>
      <p style="margin-top:4px">${rank.desc}</p>
      <div class="domain-grid">${domainHtml}</div>

      ${passedMods.length ? `
        <details style="margin-top:14px">
          <summary style="cursor:pointer;color:var(--accent2);font-weight:600">📄 View Your Unlocked Resume Bullets &amp; Verified Skills (${passedMods.length} Modules Completed)</summary>
          <div style="margin:10px 0">
            ${passedMods.flatMap(m => (m.z2h && m.z2h.profile ? m.z2h.profile.skills : [])).map(s => `<span class="skill-chip">✔ ${s}</span>`).join("")}
          </div>
          <h4>Copy-Ready CV / Resume Project Bullets Earned So Far:</h4>
          <div class="resume-box">
            ${passedMods.map(m => m.z2h && m.z2h.profile ? `<div>• ${m.z2h.profile.resumeBullet}</div>` : "").join("")}
          </div>
        </details>
      ` : `<p style="font-size:13.5px;color:var(--muted)">Pass Module 0's quiz to unlock your first verified skills, resume bullet point, and certification readiness result!</p>`}
    </div>

    <div class="filter-bar">
      ${[
        ["ALL", `All Certifications (${evals.length})`],
        ["READY", `🟢 Exam-Ready (${ready.length})`],
        ["PROGRESS", `📈 In Progress / Boost (${prog.length + boost.length})`],
        ["FREE", `🆓 Free Official Badges (${evals.filter(c => c.cost.toLowerCase().includes("free")).length})`],
        ["PAID", `🏢 Proctored / Industry Exams (${evals.filter(c => !c.cost.toLowerCase().includes("100% free")).length})`]
      ].map(([k, label]) => `<button class="filter-btn ${filter === k ? "active" : ""}" data-f="${k}">${label}</button>`).join("")}
    </div>

    <div id="certList">
      ${filtered.length ? filtered.map(c => renderFullCertCard(c, false)).join("") : `<div class="card"><p>No certifications match this filter yet. Complete module quizzes to qualify!</p></div>`}
    </div>
  `;

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.onclick = () => renderCertifications(btn.dataset.f);
  });
  window.scrollTo(0, 0);
}

$("#resetBtn").onclick = () => {
  if (confirm("Reset all quiz scores, lab checkboxes, and certification readiness progress?")) {
    state = { passed: {}, scores: {}, labs: {} };
    save();
    renderHome();
  }
};
renderHome();
