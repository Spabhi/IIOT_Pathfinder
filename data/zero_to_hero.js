/* Zero-Prior-Experience Primers, Jargon Decoders, Career Artifacts & Extra Quiz Questions for all 20 Modules */
window.ZERO_TO_HERO = {
  orientation: {
    analogy: "Think of a modern factory like the human body. Sensors and motors (Level 0) are your skin and muscles. PLCs (Level 1) are your spinal reflexes—pulling your hand off a hot stove in milliseconds without waiting for your brain. SCADA screens (Level 2) are your eyes watching what's happening. MES (Level 3) is your daily schedule, and the ERP/Mainframe (Level 4) is your bank account and long-term planner. Historically, each level could only whisper to the level directly above it (the 'Automation Pyramid'). Modern IIoT creates a nervous system—the Unified Namespace (UNS)—where every part can share updates instantly.",
    glossary: [
      ["IT (Information Technology)", "Office & cloud computing: databases, web apps, emails, ERP—where data accuracy and privacy come first."],
      ["OT (Operational Technology)", "Physical machine control: PLCs, valves, robots, power grids—where keeping machines running safely (Availability) comes first."],
      ["Brownfield", "An existing factory with 15–30-year-old machines that still work great mechanically but weren't built for the internet."],
      ["Purdue Model (ISA-95)", "The standard 5-floor map of a factory, from physical sensors at the bottom (Level 0) to business offices at the top (Level 4)."],
      ["OEE (Overall Equipment Effectiveness)", "The single score (0–100%) measuring how well a machine runs: Availability × Performance × Quality."],
      ["Unified Namespace (UNS)", "A central digital bulletin board (usually an MQTT broker) where every machine posts its live status so any app can read it."]
    ],
    beginnerGuide: "<p><b>How to approach IIoT with zero background:</b> You don't need to be a mechanical or electrical engineer. Your job as an IIoT Engineer is to be the <i>translator</i>. When you look at any industrial problem, always ask three questions in order:</p><ol><li><b>Where does the data start?</b> (Usually a sensor wired to a PLC at Level 0/1.)</li><li><b>How do we get it out safely without disturbing the machine?</b> (Read-only via an Edge Gateway at Level 2/3.5.)</li><li><b>What business decision does it drive?</b> (Higher OEE, fewer breakdowns, or automatic order updates in the Mainframe ERP at Level 4.)</li></ol><p><b>Worked Example – Calculating OEE from Scratch:</b> Suppose a bottling machine is scheduled for an 8-hour shift (480 minutes). It breaks down for 48 minutes, so it runs for 432 minutes: <code>Availability = 432 / 480 = 90%</code>. At top speed it should make 100 bottles/min (43,200 bottles), but due to minor jams it makes 38,880 bottles: <code>Performance = 38,880 / 43,200 = 90%</code>. Out of those, 38,102 pass inspection: <code>Quality = 38,102 / 38,880 = 98%</code>. Your total <code>OEE = 0.90 × 0.90 × 0.98 = 79.4%</code>.</p>",
    profile: {
      skills: ["ISA-95 / Purdue Architecture", "IT/OT Convergence Strategy", "OEE & Manufacturing KPIs", "Unified Namespace (UNS) Design"],
      deliverable: "Purdue Model & Unified Namespace Architecture Diagram (draw.io / Excalidraw) in GitHub",
      resumeBullet: "Designed an ISA-95 / Purdue-aligned Unified Namespace (UNS) reference architecture mapping Level 0–4 data flows for brownfield OEE monitoring.",
      interviewQ: "Why can't we just apply standard IT security policies (like automatic midnight Windows reboots) to factory OT systems?",
      interviewA: "In IT, Confidentiality is #1 (CIA triad). In OT, Availability and physical safety are #1 (AIC). Rebooting a controller mid-batch can ruin thousands of dollars of product or cause a physical hazard. Updates must follow scheduled maintenance windows with deterministic fallback."
    },
    extraQuiz: [
      {q:"What does 'brownfield' mean in an industrial context?",options:["A solar farm","An existing factory with legacy equipment that must be integrated without replacing everything","A brand-new automated plant built from scratch","A polluted network"],a:1,why:"Most IIoT projects happen in brownfield plants with 10–30-year-old machines."},
      {q:"If a machine has 100% Availability, 80% Performance, and 90% Quality, what is its OEE?",options:["90%","72%","85%","270%"],a:1,why:"1.00 × 0.80 × 0.90 = 0.72 (72%)."},
      {q:"Which Purdue level serves as the security buffer zone between the factory floor (OT) and corporate IT?",options:["Level 0","Level 1","Level 3.5 (Industrial DMZ)","Level 5"],a:2,why:"Level 3.5 is the Industrial DMZ separating OT control networks from corporate IT."}
    ]
  },

  networking: {
    analogy: "Think of networking like the postal system. An IP address (<code>192.168.1.10</code>) is the street address of a building (an Edge Gateway or PLC). A Port number (<code>502</code> for Modbus, <code>1883</code> for MQTT) is the apartment number inside that building so the mail reaches the right program. And a 4–20 mA analog sensor loop is like a water pipe with a pressure gauge: 4 mA means 'zero reading, but the pipe is intact', 20 mA means '100% full scale', and 0 mA immediately tells you 'the wire is cut!'",
    glossary: [
      ["IP Address & Subnet (/24)", "A device's network address. <code>/24</code> means the first three numbers (e.g. <code>192.168.1.x</code>) identify the local room, and the last number (<code>1–254</code>) identifies the device."],
      ["Port Number", "A numbered door on a computer (0–65535) where a specific service listens—like <code>502</code> for Modbus or <code>1883</code> for MQTT."],
      ["4–20 mA Current Loop", "The standard analog sensor signal. Uses electrical current instead of voltage so long factory cables don't lose accuracy, and uses 4 mA as 'zero' to detect broken wires."],
      ["RS-485", "A rugged 2-wire serial cable that lets up to 32 industrial devices talk over distances up to 1,200 meters."],
      ["Wireshark / tcpdump", "X-ray glasses for networks: lets you inspect every single packet travelling across a wire."]
    ],
    beginnerGuide: "<p><b>Step-by-Step: How to Read Any Sensor & Diagnose Any Network Connection</b></p><ol><li><b>Check physical & IP reachability:</b> Run <code>ping 192.168.1.50</code>. If it fails, check if your laptop is on the same subnet (<code>ip a</code> on Linux).</li><li><b>Check if the protocol door (port) is open:</b> Run <code>nc -vz 192.168.1.50 502</code>. If <code>ping</code> works but <code>nc</code> fails, the PLC's Modbus server is turned off or a firewall is blocking port 502.</li><li><b>Convert raw sensor signals to engineering units:</b> Industrial sensors don't send '7.5 bar' over wires—they send an electrical current (4–20 mA) that a PLC turns into a raw integer (say, <code>0</code> to <code>27648</code>). Always use the linear scaling formula: <code>EngValue = ((Raw - RawMin) / (RawMax - RawMin)) * (EngMax - EngMin) + EngMin</code>.</li></ol>",
    profile: {
      skills: ["Industrial TCP/IP & VLANs", "Linux CLI & systemd Administration", "Wireshark Protocol Analysis", "4–20 mA & RS-485 Signal Scaling"],
      deliverable: "Linux CLI & Wireshark MQTT/Modbus Packet Analysis Report + Sensor Scaling Utility",
      resumeBullet: "Configured Linux edge networking and performed Wireshark packet-level diagnostics across MQTT (1883), OPC UA (4840), and Modbus TCP (502) endpoints.",
      interviewQ: "A sensor is wired to a PLC using a 4–20 mA loop measuring –20 °C to +80 °C. You measure 0 mA on the wire. What is the temperature?",
      interviewA: "It's a hardware fault (broken wire or failed power supply), not a temperature reading! In a 4–20 mA loop, –20 °C corresponds to 4 mA. Anything near 0 mA triggers a 'wire break' diagnostic alarm."
    },
    extraQuiz: [
      {q:"Two devices have IP addresses 192.168.10.15/24 and 192.168.20.15/24. Can they talk directly without a router?",options:["Yes, because both end in .15","No, because /24 means the first three octets must match to be on the same subnet","Yes, if they use Modbus","Only on Linux"],a:1,why:"With a /24 mask (255.255.255.0), 192.168.10.x and 192.168.20.x are different subnets."},
      {q:"Which Linux command shows all currently listening TCP/UDP ports and the processes owning them?",options:["ls -la","ss -tulpn","mkdir","chmod 777"],a:1,why:"ss -tulpn lists TCP/UDP listening sockets with process numbers."},
      {q:"What is the default TCP port for unencrypted MQTT and encrypted MQTT over TLS?",options:["80 and 443","1883 and 8883","502 and 503","4840 and 4843"],a:1,why:"MQTT uses 1883 (plain) and 8883 (TLS)."}
    ]
  },

  java1: {
    analogy: "Think of Java as a universal industrial translator. When you write Java code, you compile it into 'bytecode' that runs inside the Java Virtual Machine (JVM). That means the exact same program you write on your Windows laptop today will run unmodified on an ARM Linux gateway bolted to a factory wall tomorrow, or on an IBM Mainframe in a corporate data center. In Java, a <code>class</code> is like a blueprint for a machine, an <code>object</code> is a specific machine built from that blueprint, and a <code>record</code> is a tamper-proof shipping label carrying a sensor reading.",
    glossary: [
      ["JDK vs. JRE", "JDK (Java Development Kit) is the workshop used to write and compile code; JRE (Runtime Environment) is the engine that runs compiled apps on an edge gateway."],
      ["Class & Object", "A Class is a blueprint (e.g., <code>TemperatureSensor</code>); an Object is a live instance created from it (e.g., <code>boilerSensor1</code>)."],
      ["Interface", "A contract listing methods a class promises to provide (e.g., every <code>Sensor</code> must have a <code>read()</code> method), allowing you to swap hardware without rewriting logic."],
      ["Record", "A compact, read-only Java class (<code>public record Reading(...) {}</code>) ideal for holding timestamped sensor telemetry."],
      ["Maven (pom.xml)", "Java's automatic parts manager: you list the libraries you need (like MQTT or OPC UA) in <code>pom.xml</code>, and Maven downloads them and packages your app."]
    ],
    beginnerGuide: "<p><b>Line-by-Line Walkthrough for Absolute Beginners:</b></p><pre>public record Reading(String id, double value) {} // 1. Defines an immutable packet of data\nList&lt;Reading&gt; batch = new ArrayList&lt;&gt;();          // 2. Creates a dynamic list in memory\nbatch.add(new Reading(\"TEMP_01\", 75.2));          // 3. Adds one sensor reading to the list\nbatch.stream()                                    // 4. Turns the list into a conveyor belt (Stream)\n     .filter(r -&gt; r.value() &gt; 70.0)               // 5. Keeps only readings above 70.0 (Alarm!)\n     .forEach(r -&gt; System.out.println(r));        // 6. Prints each alarm reading</pre><p><b>Common Beginner Trap:</b> Industrial protocols send raw bytes (<code>byte[]</code>), and Java's <code>byte</code> type is <i>signed</i> (-128 to +127), whereas industrial registers are often <i>unsigned</i> (0 to 255). Always use <code>Byte.toUnsignedInt(b)</code> or <code>ByteBuffer</code> when decoding raw sensor bytes!</p>",
    profile: {
      skills: ["Core Java 21 & OOP", "Java Streams & Collections", "Binary/ByteBuffer Decoding", "Maven & JUnit 5 Testing"],
      deliverable: "Object-Oriented Multi-Sensor Simulator & Alarm Engine (iiot-sim) with JUnit 5 Tests",
      resumeBullet: "Developed a modular Java 21 sensor simulation and threshold-alarm engine using OOP interfaces, immutable Records, Java Streams, and JUnit 5 unit tests.",
      interviewQ: "Why use an Interface like Sensor instead of writing directly against a specific class like ModbusTemperatureSensor?",
      interviewA: "Programming to an interface decouples business logic from hardware protocols. We can test our entire pipeline using a SimulatedSensor on a laptop and swap in ModbusSensor or OpcUaSensor in production without changing a single line of downstream code."
    },
    extraQuiz: [
      {q:"In Java, why is Byte.toUnsignedInt(b) often needed when reading industrial protocol packets?",options:["Because Java bytes are signed (-128 to 127) while protocol bytes are often unsigned (0 to 255)","To convert Strings to JSON","To speed up the CPU","Because Java doesn't support numbers"],a:0,why:"Java's byte primitive is signed two's complement (-128..127)."},
      {q:"What file defines dependencies and build plugins in a Maven project?",options:["package.json","pom.xml","build.bat","System.out"],a:1,why:"pom.xml (Project Object Model) configures Maven."},
      {q:"Which Stream operation filters elements matching a condition without modifying the original List?",options:[".filter(predicate)",".delete()",".clear()",".sort()"],a:0,why:"Stream.filter() produces a filtered stream non-destructively."}
    ]
  },

  java2: {
    analogy: "In Module 2, your Java program did one thing at a time—like a single worker reading one gauge, walking to the office, writing it down, and walking back. What if a factory has 500 gauges and the office door is temporarily locked? Your worker gets stuck waiting at the door and misses 499 readings! Advanced Java teaches you Concurrency (hiring 500 lightweight 'virtual workers' so every gauge is read on schedule) and Store-and-Forward queues (putting readings into a local outbox basket so polling never stops even if the network goes down).",
    glossary: [
      ["Concurrency / Thread", "Running multiple tasks independently at the same time inside one program."],
      ["Virtual Threads (Java 21)", "Ultra-lightweight threads that let a modest edge gateway poll thousands of slow industrial devices simultaneously without running out of memory."],
      ["BlockingQueue", "A thread-safe conveyor belt between threads: polling threads drop sensor readings on one end, and the MQTT publisher picks them up on the other."],
      ["Store-and-Forward", "Saving telemetry to local disk/queue when the network disconnects, and replaying it automatically when connection returns."],
      ["Apache PLC4X / Eclipse Milo", "Open-source Java libraries that speak PLC protocols (Modbus, S7, OPC UA) so you don't have to write raw socket drivers."]
    ],
    beginnerGuide: "<p><b>How a Production Edge Gateway is Structured in Java:</b></p><ol><li><b>Southbound Pollers (Producers):</b> A <code>ScheduledExecutorService</code> or Virtual Thread pool polls PLCs every 500 ms using <b>Apache PLC4X</b> or <b>Eclipse Milo</b> and puts each reading into a <code>LinkedBlockingQueue</code>.</li><li><b>Buffer / Outbox:</b> If the queue fills up because the internet is down, overflow records are appended to a local disk file.</li><li><b>Northbound Publisher (Consumer):</b> An asynchronous <b>HiveMQ MQTT Client</b> takes batches from the queue and publishes them over TLS. Only after receiving the broker's acknowledgment (<code>PUBACK</code>) is the reading removed from the buffer!</li></ol>",
    profile: {
      skills: ["Java 21 Concurrency & Virtual Threads", "Asynchronous MQTT (HiveMQ Client)", "Eclipse Milo & Apache PLC4X", "Store-and-Forward Resilience"],
      deliverable: "Multi-Threaded Java IIoT Gateway with Disk-Backed Store-and-Forward & Spring Boot Health API",
      resumeBullet: "Engineered a concurrent Java 21 IIoT edge gateway utilizing Virtual Threads, BlockingQueues, and HiveMQ async MQTT client with zero-data-loss store-and-forward buffering.",
      interviewQ: "What happens if your polling thread publishes directly to MQTT synchronously and the factory WAN connection drops?",
      interviewA: "The synchronous publish blocks waiting for a network timeout, which stalls the polling loop and causes missed PLC scan readings. Decoupling pollers from publishers with a bounded BlockingQueue + disk spillover ensures deterministic polling regardless of network health."
    },
    extraQuiz: [
      {q:"Why should PLC polling threads never call blocking cloud network APIs directly on the same thread?",options:["Network latency/timeouts would stall the polling loop and cause missed machine readings","Java forbids network calls","PLCs will reboot","It uses less disk space"],a:0,why:"Decoupling via an asynchronous queue isolates southbound polling from northbound network jitter."},
      {q:"Which Java library provides a unified MQTT 5.0 asynchronous & reactive client built on Netty?",options:["JUnit","HiveMQ MQTT Client","JDBC","Swing"],a:1,why:"HiveMQ MQTT Client is a high-performance Netty-based MQTT 3.1.1/5.0 library."},
      {q:"In a CompletableFuture pipeline, which method chains a subsequent asynchronous operation?",options:["thenCompose()","Thread.sleep()","System.exit()","synchronized"],a:0,why:"thenCompose flattens and chains dependent asynchronous stages."}
    ]
  },

  zos: {
    analogy: "If a Linux server is a sports car and a cloud cluster is a fleet of delivery vans, an <b>IBM Mainframe (z/OS)</b> is a mile-long freight train. It isn't meant for flashy graphics; it is built to process millions of critical business transactions (orders, inventory, utility bills, payroll) every single second with 99.99999% uptime. Instead of folders and files like Windows (<code>C:\\folder\\file.txt</code>), z/OS organizes data into structured ledger books called <b>Datasets</b> (<code>PLANT1.SENSOR.DAILY</code>) and uses a character alphabet called <b>EBCDIC</b> instead of ASCII.",
    glossary: [
      ["z/OS", "IBM's flagship operating system for Z mainframes, designed for extreme reliability, security, and massive I/O throughput."],
      ["Dataset", "A mainframe file. Named with dots in segments of up to 8 characters, e.g., <code>USER01.IIOT.DATA</code>."],
      ["PDS (Partitioned Dataset)", "A dataset that acts like a folder containing multiple individual text members, e.g., <code>USER01.JCL(JOB1)</code>."],
      ["VSAM", "Virtual Storage Access Method—high-speed indexed datasets used like database tables by mainframe programs."],
      ["EBCDIC", "Extended Binary Coded Decimal Interchange Code—the 8-bit character encoding used on mainframes (where 'A' is byte <code>0xC1</code> instead of ASCII <code>0x41</code>)."],
      ["Zowe", "Modern open-source plugin that lets you browse mainframe datasets and submit jobs right inside VS Code."]
    ],
    beginnerGuide: "<p><b>Zero-Experience Orientation to the Mainframe World:</b></p><ul><li><b>You don't need a green-screen terminal anymore:</b> While veterans use 3270 terminals (<code>TSO</code> and <code>ISPF</code> menus), you can install VS Code + the free <b>Zowe Explorer</b> extension to click on datasets and submit jobs just like a modern cloud workspace.</li><li><b>Understand Fixed-Length Records (<code>RECFM=FB, LRECL=80</code>):</b> Unlike normal text files where lines end with a newline character (<code>\\n</code>), traditional mainframe datasets store records as fixed-width blocks (e.g., exactly 80 bytes per record, padded with spaces). Column positions matter!</li><li><b>Why IIoT Engineers Care:</b> In automotive, utilities, and large manufacturing, when a production line finishes 1,000 car doors or smart meters report kilowatt-hours, the master system of record is often Db2 or VSAM on z/OS.</li></ul>",
    profile: {
      skills: ["IBM z/OS Architecture", "Mainframe Datasets (PS, PDS, VSAM, GDG)", "Zowe CLI & VS Code Explorer", "EBCDIC & Record Layout Design"],
      deliverable: "z/OS Dataset Hierarchy & Sensor Telemetry Ingestion Layout via Zowe / IBM Z Xplore",
      resumeBullet: "Configured z/OS sequential, PDS, and GDG datasets using Zowe CLI and ISPF to stage shop-floor telemetry extracts for enterprise batch processing.",
      interviewQ: "You send a plain-text ASCII CSV file of sensor readings from a Linux gateway directly into a mainframe dataset without conversion. What happens when a mainframe program reads it?",
      interviewA: "The characters will look like garbage because z/OS natively expects EBCDIC encoding, not ASCII/UTF-8. Integration pipelines must translate character sets (e.g., UTF-8 to IBM1047/Cp037) either in MQ, FTP/SFTP transfer options, or the Java adapter."
    },
    extraQuiz: [
      {q:"What is the maximum length of a single qualifier segment (between dots) in a traditional z/OS dataset name?",options:["3 characters","8 characters","64 characters","Unlimited"],a:1,why:"Each qualifier segment is 1–8 characters, up to 44 characters total."},
      {q:"In a dataset with RECFM=FB and LRECL=80, how are records separated?",options:["By HTML tags","There are no newline characters; every 80 bytes is automatically one fixed-length record","By commas","By semicolons"],a:1,why:"Fixed-Blocked datasets slice records purely by byte length (LRECL)."},
      {q:"What is SDSF used for on z/OS?",options:["Writing Java code","Viewing the JES job spool, active jobs, and batch job output logs","Editing photos","Configuring Wi-Fi"],a:1,why:"System Display and Search Facility inspects job logs and queues."}
    ]
  },

  jcl: {
    analogy: "Think of <b>JCL (Job Control Language)</b> as a kitchen recipe card handed to the head chef (z/OS). JCL does not cook the food itself (it doesn't calculate numbers or loop through data—that's PL/I or COBOL's job). Instead, JCL tells the kitchen: 1) <b>Who</b> is ordering (<code>//JOB</code>), 2) <b>Which appliance/program</b> to run (<code>//STEP1 EXEC PGM=...</code>), and 3) <b>Which ingredient containers</b> (datasets) to plug into that program's input and output pipes (<code>//INPUT DD DSN=...</code>).",
    glossary: [
      ["//JOB", "The header card identifying the job name, billing account, and logging settings."],
      ["//EXEC", "Tells z/OS which program (<code>PGM=SORT</code>) or reusable procedure (<code>PROC</code>) to execute in this step."],
      ["//DD (Data Definition)", "Connects a logical file name inside a program (like <code>SORTIN</code>) to an actual physical dataset on disk (<code>DSN=PLANT.RAW</code>)."],
      ["DISP=(status,normal,abnormal)", "Tells z/OS whether a dataset is <code>NEW</code> or existing (<code>SHR</code>/<code>OLD</code>), what to do if the step succeeds (<code>CATLG</code>/<code>KEEP</code>), and what to do if it crashes (<code>DELETE</code>)."],
      ["GDG (Generation Data Group)", "Auto-versioned datasets where <code>(0)</code> is today's file, <code>(+1)</code> creates tomorrow's file, and <code>(-1)</code> is yesterday's file."],
      ["Abend", "'Abnormal End'—mainframe term for a program crash, accompanied by a diagnostic code like <code>S0C7</code>."]
    ],
    beginnerGuide: "<p><b>How to Read Any JCL File in 30 Seconds:</b></p><p>Every JCL line starts with <code>//</code> (or <code>//*</code> for a comment). Never start code in column 1 or go past column 71! Look at the three keywords:</p><pre>//MYJOB    JOB (123),'IIOT BATCH',CLASS=A,MSGCLASS=X   &lt;-- 1. Start the Job\n//* This step sorts raw sensor data and filters alarms\n//STEP01   EXEC PGM=SORT                               &lt;-- 2. Run IBM's SORT utility\n//SORTIN   DD DSN=USER01.SENSOR.RAW,DISP=SHR           &lt;-- 3. Input file (Share existing)\n//SORTOUT  DD DSN=USER01.SENSOR.DAILY(+1),             &lt;-- 4. Output: create next GDG version\n//            DISP=(NEW,CATLG,DELETE),SPACE=(TRK,(5,5))\n//SYSOUT   DD SYSOUT=*                                 &lt;-- 5. Print logs to spool\n//SYSIN    DD *                                        &lt;-- 6. Inline control commands:\n  SORT FIELDS=(1,8,CH,A)\n/*</pre>",
    profile: {
      skills: ["JCL Batch Orchestration", "IBM Utilities (DFSORT, IDCAMS, IEBGENER)", "GDG Versioning", "Abend Root-Cause Analysis (S0C7, S806, SB37)"],
      deliverable: "Multi-Step JCL Telemetry Sorting, Filtering & GDG Archival Pipeline",
      resumeBullet: "Authored automated z/OS JCL batch pipelines using DFSORT, IDCAMS, and Generation Data Groups (GDGs) to validate, filter, and archive daily industrial sensor extracts.",
      interviewQ: "Your nightly JCL job that loads factory production counts fails with Abend S0C7 in STEP02. What caused it and how do you fix it?",
      interviewA: "S0C7 is a Data Exception—the program tried to do math on a numeric/packed-decimal field that contained invalid non-numeric bytes (often spaces or corrupted sensor text). I would check the SYSOUT/dump offset, inspect the offending input record in the dataset, and add validation or a DFSORT INCLUDE/OMIT filter upstream."
    },
    extraQuiz: [
      {q:"In JCL, what does a line starting with //* represent?",options:["A critical system command","A comment line ignored during execution","A syntax error","The end of the file"],a:1,why:"//* denotes a comment in JCL."},
      {q:"Which JCL abend code indicates that a dataset ran out of allocated disk space?",options:["S0C7","S806","SB37 / SD37 / SE37","S322"],a:2,why:"B37/D37/E37 are space-related abends requiring larger SPACE= allocations."},
      {q:"Why is PGM=IEFBR14 frequently used in JCL even though the program itself does nothing?",options:["To heat up the CPU","Because the OS still processes the step's DD statements to allocate or delete datasets","To sort records","To compile PL/I"],a:1,why:"IEFBR14 returns RC=0 immediately, letting JES/allocation create or delete datasets specified in DD cards."}
    ]
  },

  pli: {
    analogy: "When IBM built System/360 in the 1960s, scientific programmers used Fortran (great at floating-point math, terrible at files) and business programmers used COBOL (great at files and dollars, wordy for math). IBM created <b>PL/I (Programming Language One)</b> to combine the best of both worlds—and that is exactly why heavy manufacturing, automotive, and power utilities adopted it! It reads structured mainframe datasets with ease while handling engineering math and bit-level status flags.",
    glossary: [
      ["PROCEDURE OPTIONS(MAIN)", "The main entry point of a PL/I program (equivalent to <code>main()</code> in Java or C)."],
      ["DCL (DECLARE)", "Declares a variable or record structure, e.g., <code>DCL TEMP FIXED DECIMAL(7,2);</code>."],
      ["FIXED DECIMAL(p,q)", "Exact decimal numbers stored in Packed Decimal (COMP-3) format—zero rounding errors for billing and inventory counts."],
      ["Level-Numbered Structure", "A hierarchical record definition (<code>1 READING, 3 ID CHAR(8), 3 VAL ...</code>) that maps byte-for-byte onto a fixed-width file record."],
      ["ON Condition (ON ENDFILE, ON CONVERSION)", "Built-in event/exception handlers that trigger automatically when a file ends or bad data is encountered."]
    ],
    beginnerGuide: "<p><b>How PL/I Maps Directly to Industrial Records:</b></p><p>Imagine an 80-byte record coming from an edge gateway. In PL/I, you declare a structure (<code>DCL 1 READING</code>) whose field lengths add up to 80 bytes. A single <code>READ FILE(SENSIN) INTO(READING);</code> populates every field in one operation!</p><p><b>Beginner Pitfall to Avoid:</b> In PL/I, don't mix <code>FLOAT</code> and <code>FIXED DECIMAL</code> carelessly in financial or inventory totals, and always include an <code>ON CONVERSION</code> handler when parsing external telemetry so a single garbled sensor line logs a warning instead of crashing the whole nightly batch with <code>S0C7</code>!</p>",
    profile: {
      skills: ["IBM Enterprise PL/I", "Structured Record I/O & Control-Break Logic", "ON-Condition Error Recovery", "Batch Return-Code Signaling (PLIRETC)"],
      deliverable: "PL/I Telemetry Aggregation & Anomaly Reporting Program with JCL Compile-Bind-Go",
      resumeBullet: "Developed fault-tolerant IBM Enterprise PL/I batch programs utilizing RECORD I/O, FIXED DECIMAL structures, and ON CONVERSION handlers to aggregate plant sensor datasets.",
      interviewQ: "How do you prevent a single corrupted character in a raw telemetry file from crashing a PL/I batch job?",
      interviewA: "Register an ON CONVERSION condition handler (ON CONVERSION BEGIN; ... ONSOURCE = '0'; END;). It intercepts the bad character conversion, logs the offending record ID, substitutes a safe default via the ONSOURCE pseudovariable, and continues processing."
    },
    extraQuiz: [
      {q:"How many bytes does FIXED DECIMAL(5,2) (5 digits + sign in packed decimal) occupy in storage?",options:["3 bytes","5 bytes","8 bytes","16 bytes"],a:0,why:"Packed decimal stores 2 digits per byte, with the last nibble holding the sign: (5 + 1) / 2 = 3 bytes."},
      {q:"Which PL/I statement signals a custom return code (such as 4 for warnings) back to the calling JCL step?",options:["CALL PLIRETC(4);","System.exit(4);","RETURN 0;","STOP;"],a:0,why:"PLIRETC sets the step return code tested by JCL IF/COND statements."},
      {q:"In a PL/I structure DCL 1 MACHINE, 3 ID CHAR(10), 3 RPM FIXED BIN(31);, what do the numbers 1 and 3 represent?",options:["Line numbers","Hierarchy levels (1 is the root structure, 3 are child fields)","Array sizes","Initial values"],a:1,why:"Level numbers define the nesting hierarchy of a structure."}
    ]
  },

  mfint: {
    analogy: "Your factory floor speaks modern, fast, lightweight JSON over MQTT (<code>{\"order\": 5001, \"qty\": 240}</code>). Your corporate IBM Mainframe speaks transactional CICS, Db2, and EBCDIC packed-decimal structures. <b>Mainframe Integration</b> is the customs border crossing between them: <b>IBM MQ</b> acts as an armored courier truck guaranteeing that every completed production order arrives exactly once (even if a server restarts), while <b>z/OS Connect</b> acts as a simultaneous translator turning mainframe CICS programs into modern REST/JSON APIs.",
    glossary: [
      ["IBM MQ", "Enterprise message queueing middleware that guarantees once-and-only-once delivery between factory systems and mainframes."],
      ["CICS", "Customer Information Control System—the ultra-fast online transaction server on z/OS that processes thousands of order/inventory updates per second."],
      ["z/OS Connect", "Middleware that wraps legacy CICS/IMS/Db2 mainframe programs in modern OpenAPI / REST JSON endpoints."],
      ["Packed Decimal (COMP-3)", "Stores two decimal digits in each byte (e.g., <code>+123</code> is <code>0x12 0x3C</code>), saving space and speeding up mainframe decimal math."],
      ["Dead-Letter Queue (DLQ)", "A holding queue where undeliverable or malformed messages are safely parked for inspection instead of being lost."]
    ],
    beginnerGuide: "<p><b>When to Choose Which Mainframe Integration Pattern:</b></p><ul><li><b>High-volume, asynchronous events (e.g., machine cycle completions, smart meter readings):</b> Use <b>MQTT → Kafka / IBM MQ → CICS or Batch</b>. If the mainframe is in a maintenance window, MQ safely holds the messages on disk.</li><li><b>Synchronous request/reply (e.g., gateway asks ERP 'What are the target tolerances for Order #992?'):</b> Call a REST API exposed by <b>z/OS Connect</b> over HTTPS.</li><li><b>High-volume analytical history:</b> Stream raw telemetry to a cloud/time-series database, and send only <i>aggregated shift summaries</i> or exceptions to the mainframe to avoid costly mainframe MIPS charges!</li></ul>",
    profile: {
      skills: ["IBM MQ & JMS 2.0 Integration", "z/OS Connect REST API Design", "EBCDIC / COMP-3 Binary Marshalling", "Event-Driven IT/OT-to-ERP Architecture"],
      deliverable: "Java MQTT-to-IBM MQ Bridge with EBCDIC & Packed-Decimal Copybook Encoder",
      resumeBullet: "Built a transactional Java JMS bridge connecting MQTT shop-floor order events to IBM MQ and z/OS, handling UTF-8 JSON to EBCDIC/COMP-3 record serialization.",
      interviewQ: "Why shouldn't you stream raw 100 Hz vibration sensor data directly into mainframe CICS or Db2?",
      interviewA: "Mainframe compute (MIPS/MSUs) is priced for high-value business transactions, not raw noisy time-series storage. Best practice is to process high-frequency telemetry at the edge or in a TSDB, and only send actionable business events (e.g., a maintenance work-order trigger or shift production summary) to z/OS via MQ or z/OS Connect."
    },
    extraQuiz: [
      {q:"Why is IBM MQ preferred over plain HTTP when sending completed production order counts from the factory to the mainframe ERP?",options:["HTTP is illegal in factories","MQ provides persistent queues and guaranteed once-only delivery even if the target system is temporarily offline","MQ doesn't use networks","MQ only works on Windows"],a:1,why:"Persistent messaging prevents lost financial/inventory transactions during outages."},
      {q:"In Packed Decimal (COMP-3), what does a final nibble of 0xC or 0xF vs 0xD indicate?",options:["C/F = positive/unsigned, D = negative","C = Celsius, F = Fahrenheit","Hexadecimal overflow","End of file"],a:0,why:"In EBCDIC packed decimal, C/F denote positive/unsigned and D denotes negative."},
      {q:"What happens to an IBM MQ message that cannot be delivered to its target queue?",options:["It crashes the mainframe","It is routed to the Dead-Letter Queue (DLQ) for inspection and replay","It is broadcast to all sensors","It turns into a JCL comment"],a:1,why:"The DLQ preserves undeliverable messages safely."}
    ]
  },

  ot: {
    analogy: "A regular desktop computer is like a multi-tasking office worker: it checks email, updates Windows in the background, and occasionally freezes for two seconds while opening a heavy spreadsheet. If a computer controlling a high-speed bottling press freezes for two seconds, bottles shatter and workers can get hurt! That's why factories use <b>PLCs (Programmable Logic Controllers)</b>. A PLC does one thing in a relentless, predictable heartbeat called the <b>Scan Cycle</b> every few milliseconds: 1) Check all input switches/sensors, 2) Run the control rules, 3) Flip output relays/valves. Repeat forever.",
    glossary: [
      ["PLC (Programmable Logic Controller)", "A ruggedized industrial computer without a mouse or monitor that executes real-time machine control loops."],
      ["Scan Cycle", "The deterministic loop of a PLC: Read Inputs → Execute Logic → Write Outputs (typically every 1 to 20 milliseconds)."],
      ["IEC 61131-3", "The international standard defining the 5 PLC programming languages, including Ladder Diagram (LD) and Structured Text (ST)."],
      ["SCADA", "Supervisory Control and Data Acquisition—the control-room screens and servers that monitor and command many PLCs across a plant."],
      ["PID Controller", "The mathematical cruise-control algorithm (Proportional-Integral-Derivative) that smoothly holds a temperature, pressure, or flow at its target setpoint."],
      ["SIS (Safety Instrumented System)", "Dedicated, independent emergency-stop hardware (IEC 61511) that shuts a process down safely if limits are breached."]
    ],
    beginnerGuide: "<p><b>Reading PLC Logic Without Any Electrical Background:</b></p><ul><li><b>Ladder Logic (LD)</b> looks like electrical schematics because it was invented so factory electricians could read it: contacts (<code>--| |--</code> = IF true, <code>--|/|--</code> = IF NOT true) on the left lead to coils (<code>--( )--</code> = SET output) on the right.</li><li><b>Structured Text (ST)</b> looks like clean Pascal/Python (<code>IF TankLevel &gt; 90.0 THEN Valve := FALSE; END_IF;</code>). Most modern complex PLC blocks are written in ST!</li><li><b>Golden Rule of IIoT:</b> Never bypass a PLC's safety interlocks from an IIoT app. Treat PLC memory as <i>read-only</i> unless you are writing to a dedicated, bounds-checked 'Remote Setpoint' register designed by the controls engineer.</li></ul>",
    profile: {
      skills: ["PLC Scan Cycle & Determinism", "IEC 61131-3 (Structured Text & Ladder)", "SCADA / HMI & Historian Architecture", "ISA-18.2 Alarm Management & PackML"],
      deliverable: "OpenPLC / CODESYS Soft-PLC Bottling Line Program with PackML State Machine",
      resumeBullet: "Programmed an IEC 61131-3 Structured Text soft-PLC state machine (PackML) exposing process variables and ISA-18.2 alarms over Modbus TCP and OPC UA.",
      interviewQ: "Why shouldn't an IIoT cloud application directly toggle physical PLC output coils to control a fast-moving machine?",
      interviewA: "Cloud and IT networks are non-deterministic (latency can spike from 20 ms to several seconds, or connections can drop). Physical control loops and safety interlocks must execute deterministically inside the PLC scan cycle (Level 1); cloud/edge apps should only send high-level recipe setpoints that the PLC validates locally."
    },
    extraQuiz: [
      {q:"Why does a PLC snapshot all physical inputs at the start of a scan cycle instead of reading wires mid-program?",options:["To guarantee deterministic logic—an input won't change state halfway through evaluating a rung/equation","Because wires are slow","To save electricity","Because IEC 61131-3 forbids variables"],a:0,why:"Process image snapshotting ensures consistent input values throughout the entire scan evaluation."},
      {q:"What is an 'alarm flood' according to ISA-18.2?",options:["A water leak in the control room","When alarms trigger faster than an operator can effectively respond (e.g., >10 alarms per 10 minutes)","A broken siren","When zero alarms occur"],a:1,why:"Alarm floods overwhelm operators and mask critical root-cause alarms."},
      {q:"Which standard defines common machine states like IDLE, EXECUTE, HELD, and ABORTED for packaging and manufacturing machines?",options:["PackML (ISA-TR88.00.02)","HTML5","SQL-92","Bluetooth 5"],a:0,why:"PackML standardizes machine modes and state models."}
    ]
  },

  protocols: {
    analogy: "Imagine walking into the United Nations where every delegate speaks a different language invented between 1979 and 2010. <b>Modbus</b> is like communicating via numbered post-office boxes: fast and universal, but box <code>#40001</code> just holds a raw number (<code>2340</code>) with no label telling you if it means <code>23.40 °C</code> or <code>2,340 RPM</code>! Worse, if a number is too big for one box, it gets split across two boxes—and some vendors put the left half in box 1 (<b>Big-Endian / ABCD</b>), while others put the right half in box 1 (<b>Word-Swapped / CDAB</b>).",
    glossary: [
      ["Modbus RTU vs. Modbus TCP", "Modbus RTU sends binary bytes over RS-485 serial wires; Modbus TCP wraps those exact same commands inside standard Ethernet TCP packets on port 502."],
      ["Coils vs. Registers", "Coils are 1-bit ON/OFF switches (<code>true</code>/<code>false</code>); Registers are 16-bit number slots (<code>0</code> to <code>65535</code>)."],
      ["Endianness / Word Order", "The order in which two 16-bit registers are combined to form a 32-bit float (<code>ABCD</code> vs <code>CDAB</code>). Getting this wrong gives wild numbers like <code>1.4e-42</code>!"],
      ["PROFINET & EtherNet/IP", "High-speed industrial Ethernet protocols used by Siemens (PROFINET) and Rockwell/Allen-Bradley (EtherNet/IP)."],
      ["Sensor Drift & Noise", "Real sensors wiggle slightly around the true value (noise) and gradually shift over months as components wear (drift)."]
    ],
    beginnerGuide: "<p><b>How to Decode Any Modbus Device Without Getting Stuck:</b></p><ol><li><b>Get the Register Map table from the device manual:</b> It tells you the Register Address, Function Code (<code>03</code> Holding or <code>04</code> Input), Data Type (<code>INT16</code>, <code>UINT16</code>, <code>FLOAT32</code>), Scaling Factor (e.g. <code>× 0.1</code>), and Word Order.</li><li><b>Watch out for the 'Off-by-One' Address Trap:</b> Manuals often write register <code>40001</code> (1-based human notation), which actually means Holding Register offset <code>0</code> on the wire! If your value looks wrong, check offset <code>0</code> vs <code>1</code>.</li><li><b>Check Word Order for 32-bit Floats:</b> Two 16-bit registers (<code>0x41C8</code> and <code>0x0000</code>) equal exactly <code>25.0</code> in Big-Endian (<code>ABCD</code>). Swapped (<code>0x0000</code>, <code>0x41C8</code>), they equal <code>2.4e-41</code>!</li></ol>",
    profile: {
      skills: ["Modbus TCP/RTU Register Decoding", "Byte/Word-Order (Endianness) Handling", "Multi-Protocol Survey (PROFINET, EtherNet/IP, S7, DNP3)", "Physics-Based Sensor Simulation"],
      deliverable: "Python/Java Multi-Register Modbus Simulator & Client Poller with Noise/Drift Injection",
      resumeBullet: "Implemented a Modbus TCP server simulator and Java/Python client handling 32-bit IEEE-754 float word-order decoding, scaling, and realistic sensor drift/fault injection.",
      interviewQ: "You read a 32-bit floating-point temperature from two consecutive Modbus holding registers, and your code prints -3.84e+28 instead of ~22.5 °C. What is the most likely cause?",
      interviewA: "Word-order (endianness) mismatch or an off-by-one register offset. Either we are combining the two 16-bit registers in ABCD order when the PLC stores them in CDAB (word-swapped) order, or we started reading at register offset N+1 instead of N."
    },
    extraQuiz: [
      {q:"Why do people often get an 'off-by-one' error when reading Modbus Holding Register 40001?",options:["Because 40001 is 1-based documentation notation for Function Code 03 at wire offset 0","Because Modbus skips odd numbers","Because TCP drops the first byte","Because 40001 is a coil"],a:0,why:"Register 40001 in manuals corresponds to 0-based protocol address 0."},
      {q:"What happens if you combine two 16-bit Modbus registers for a 32-bit float using the wrong word order (e.g., ABCD instead of CDAB)?",options:["The PLC shuts down","You get a wildly incorrect floating-point number (like 1.2e-38 or NaN)","It automatically fixes itself","The network disconnects"],a:1,why:"Swapping the exponent and mantissa words produces garbage IEEE-754 floats."},
      {q:"Which protocol is native to Siemens S7-1200/1500 PLCs on TCP port 102?",options:["S7comm","BACnet","Modbus ASCII","SNMP"],a:0,why:"Siemens S7 controllers use S7comm / S7comm-plus on TCP port 102."}
    ]
  },

  opcua: {
    analogy: "If Modbus is a sheet of unmarked post-office boxes (<code>#40001 = 2340</code>), <b>OPC UA</b> is a self-describing, security-guarded digital folder tree. When you connect to an OPC UA server, you can browse it just like Windows Explorer: you open <code>Line1 → Boiler → Temperature</code>, and the node itself tells you: <i>'My value is 72.4, my engineering unit is °C, my valid range is 0–120, my sensor quality is GOOD, my exact source timestamp is 12:00:01.042, and only authenticated users with X.509 certificates are allowed to read me.'</i>",
    glossary: [
      ["Address Space", "The hierarchical tree/graph of Objects, Variables, and Methods exposed by an OPC UA server."],
      ["NodeId (ns=2;s=Boiler.Temp)", "The unique address of any item in OPC UA, combining a Namespace index (<code>ns=2</code>) and an identifier (<code>s=...</code> string or <code>i=...</code> integer)."],
      ["Subscription & MonitoredItem", "Instead of asking 'What's the value?' every second (polling), you tell the server: 'Notify me only when <code>Boiler.Temp</code> changes by more than 0.5 °C (Deadband).'"],
      ["Companion Specification", "Industry-agreed blueprints (e.g., for Robotics, CNC, or Packaging machines) so a KUKA robot and an ABB robot expose the exact same OPC UA node names."],
      ["X.509 Application Certificate", "Digital ID cards exchanged between an OPC UA client and server to establish mutual trust and encryption (<code>SignAndEncrypt</code>)."]
    ],
    beginnerGuide: "<p><b>Two Core Concepts Every OPC UA Developer Must Master:</b></p><ol><li><b>Sampling Interval vs. Publishing Interval in Subscriptions:</b> Suppose you set <code>SamplingInterval = 100 ms</code> and <code>PublishingInterval = 1000 ms</code> with a <code>Deadband = 1.0 °C</code>. The OPC UA server checks the PLC value every 100 ms internally, ignores tiny fluctuations under 1 °C, and sends one bundled network packet to your client every 1,000 ms (1 second). This cuts network traffic by 90%+ compared to polling!</li><li><b>Certificate Trust Handshake:</b> The first time a secure client connects to an OPC UA server, the server puts the client's certificate into a <code>Rejected</code> folder until an administrator moves it to <code>Trusted</code>. Knowing this saves hours of beginner debugging!</li></ol>",
    profile: {
      skills: ["OPC UA (IEC 62541) Information Modeling", "Eclipse Milo / asyncua Client & Server Dev", "Subscriptions & Deadband Optimization", "OPC UA X.509 PKI & SignAndEncrypt Security"],
      deliverable: "Custom OPC UA Server (PumpType Information Model) & Secure Subscription Client",
      resumeBullet: "Developed an IEC 62541 OPC UA client/server pipeline using Eclipse Milo and Python asyncua with deadband-filtered subscriptions and X.509 SignAndEncrypt security.",
      interviewQ: "Explain the difference between Sampling Interval, Publishing Interval, and Deadband in an OPC UA Subscription.",
      interviewA: "Sampling Interval is how fast the server checks the underlying PLC tag; Deadband is the minimum change required for a sample to be queued as a notification; Publishing Interval is how often the server sends queued notifications over the network to the client."
    },
    extraQuiz: [
      {q:"In an OPC UA NodeId ns=2;s=Line1.Pump.Speed, what does ns=2 mean?",options:["Network speed = 2 Mbps","Namespace index 2 (identifying which model/vendor vocabulary the node belongs to)","2 nodes remaining","Security level 2"],a:1,why:"ns specifies the Namespace Index in the server's namespace array."},
      {q:"When a secure OPC UA client connects for the first time with an unknown X.509 certificate, what does a properly configured server do?",options:["Crashes","Rejects the connection and places the certificate in its Rejected list until an admin moves it to the Trusted store","Deletes the certificate","Disables all security"],a:1,why:"Mutual X.509 trust requires explicit approval in the server's trust store."},
      {q:"How does an Absolute Deadband of 0.5 on a temperature MonitoredItem reduce network traffic?",options:["It compresses strings","The server only queues a data-change notification when the value changes by at least ±0.5 from the last reported value","It turns off the sensor","It rounds all numbers to zero"],a:1,why:"Deadband filtering suppresses noisy micro-fluctuations at the source."}
    ]
  },

  mqtt: {
    analogy: "Think of <b>MQTT</b> like a YouTube channel or radio broadcast. A sensor gateway doesn't need to know the IP address of the SCADA server, the database, or the cloud. It simply connects outbound to a central <b>Broker</b> and publishes updates to a topic address (<code>acme/berlin/packaging/line1/temp</code>). Any authorized app subscribed to that topic receives the update in milliseconds. And <b>Sparkplug B</b> adds the missing industrial rules: a standard address book (<code>spBv1.0/...</code>), ultra-compact binary packaging (Protobuf), and an automatic 'heartbeat monitor' (<b>Last Will / NDEATH</b>) so the whole factory knows the instant a gateway loses power.",
    glossary: [
      ["MQTT Broker", "The central post office (e.g., HiveMQ, EMQX, Mosquitto) that receives messages from publishers and routes them to subscribers."],
      ["Topic & Wildcards (+, #)", "A slash-separated address (<code>plant/line1/temp</code>). <code>+</code> matches one level (<code>plant/+/temp</code>); <code>#</code> matches everything underneath (<code>plant/#</code>)."],
      ["QoS (Quality of Service 0, 1, 2)", "Delivery guarantee: <code>0</code> = fire and forget, <code>1</code> = at least once (acknowledged), <code>2</code> = exactly once."],
      ["Retained Message", "A flag telling the broker to keep the most recent message on a topic and hand it immediately to any new subscriber that connects later."],
      ["Last Will & Testament (LWT)", "An emergency message pre-registered with the broker on connect; if the device's connection drops unexpectedly, the broker publishes it automatically."],
      ["Sparkplug B (NBIRTH, NDATA, NDEATH)", "The industrial standard on top of MQTT that defines exact topic structure, Protobuf data types, and birth/death state certificates."]
    ],
    beginnerGuide: "<p><b>How Sparkplug B Solves the 3 Biggest Problems of Plain MQTT:</b></p><ol><li><b>Problem 1 – 'Is the device dead or did the temperature just stop changing?'</b> Sparkplug registers an <code>NDEATH</code> message as the MQTT Last Will when connecting, and publishes an <code>NBIRTH</code> listing all metrics. You always know with 100% certainty if a gateway is alive.</li><li><b>Problem 2 – 'Why send every tag every second when only 2 changed?'</b> Sparkplug uses <b>Report by Exception (RBE)</b>: <code>NBIRTH</code> sends the full list once, and <code>NDATA</code>/<code>DDATA</code> only sends metrics that actually changed!</li><li><b>Problem 3 – 'What if the SCADA historian goes offline?'</b> Edge nodes watch the <code>spBv1.0/STATE/&lt;host_id&gt;</code> topic. If the Primary Host disconnects, the edge node stops sending and buffers locally until <code>STATE</code> comes back <code>ONLINE</code>!</li></ol>",
    profile: {
      skills: ["MQTT 3.1.1 & 5.0 Architecture", "Sparkplug B (ISO/IEC 20237) State Management", "Unified Namespace (UNS) Topic Modeling", "Eclipse Tahu & HiveMQ Broker Config"],
      deliverable: "Stateful Sparkplug B Edge Node with NBIRTH/NDEATH, Report-by-Exception & Rebirth Handling",
      resumeBullet: "Architected an ISO/IEC 20237 Sparkplug B edge node and Unified Namespace (UNS) on HiveMQ/Mosquitto featuring NBIRTH/NDEATH lifecycle tracking and report-by-exception Protobuf payloads.",
      interviewQ: "In Sparkplug B, why shouldn't you set the MQTT retain flag to true on NDATA or DDATA messages?",
      interviewA: "Because NDATA/DDATA messages are Report-by-Exception (they only contain the subset of metrics that changed in that instant). Retaining a partial DDATA message wouldn't give a new subscriber the full device state. Instead, Sparkplug uses NBIRTH/DBIRTH and NCMD Rebirth requests to synchronize full state."
    },
    extraQuiz: [
      {q:"If a subscriber connects to plant/+/temp, which of these topics will it receive?",options:["plant/line1/temp and plant/line2/temp","plant/line1/zoneA/temp","plant/temp","All topics on the broker"],a:0,why:"+ matches exactly one hierarchy level."},
      {q:"What is the purpose of an MQTT Retained message?",options:["To encrypt payloads","To immediately deliver the last known good value on a topic to newly connected subscribers without waiting for the next publish","To delete old topics","To disconnect idle clients"],a:1,why:"The broker stores one retained message per topic for new subscribers."},
      {q:"In Sparkplug B, how does an Edge Node know whether the Primary Host Application (e.g., SCADA/Historian) is online and ready to receive data?",options:["It pings Google","It subscribes to the retained spBv1.0/STATE/<host_application_id> topic","It sends an email","It checks Modbus"],a:1,why:"Primary hosts maintain their online/offline state on the STATE topic."}
    ]
  },

  edge: {
    analogy: "Think of an <b>Industrial Edge Gateway</b> as a bilingual field manager stationed right on the factory floor. On its left hand (the <b>Southbound</b> Ethernet port), it talks local machine dialects (Modbus, S7, OPC UA) to PLCs on an isolated factory network. Inside its brain, it cleans up noisy data, attaches context (<i>'This temperature belongs to Machine #4 running Order #881'</i>), and buffers readings on an SSD if the internet cuts out. On its right hand (the <b>Northbound</b> port), it sends clean, encrypted MQTT/Sparkplug updates to the enterprise and cloud.",
    glossary: [
      ["Southbound vs. Northbound", "Southbound = facing down toward PLCs and sensors (Purdue L0/L1); Northbound = facing up toward MQTT brokers, MES, and Cloud (L3/L4)."],
      ["Contextualization (Industrial DataOps)", "Turning a cryptic raw PLC tag (<code>DB10.DBD4 = 412</code>) into self-describing business data (<code>{site:'Berlin', asset:'Press02', order:'ORD-99', pressureBar: 4.12}</code>)."],
      ["Node-RED", "A visual, browser-based wiring tool where you drag-and-drop protocol blocks (Modbus, OPC UA, MQTT) and connect them with lines."],
      ["Dual-Homed Gateway", "An industrial PC with two physically separate network ports—one plugged into the isolated PLC network, one plugged into the plant IT network."]
    ],
    beginnerGuide: "<p><b>The 4 Jobs of Every Edge Gateway Pipeline:</b></p><ol><li><b>Ingest (Southbound):</b> Poll Modbus/S7 or subscribe to OPC UA nodes.</li><li><b>Filter & Aggregate:</b> Drop unchanged readings (Deadband) or downsample 100 Hz vibration into 1-second RMS/Peak features.</li><li><b>Contextualize:</b> Standardize engineering units (°F → °C) and enrich with ISA-95 path (<code>enterprise/site/area/line/cell</code>).</li><li><b>Buffer & Publish (Northbound):</b> Queue locally if offline; publish over TLS to the Unified Namespace.</li></ol>",
    profile: {
      skills: ["Edge Gateway Architecture (Southbound/Northbound)", "Node-RED Industrial Flow Development", "Industrial DataOps & Contextualization", "EdgeX Foundry & Eclipse Kura"],
      deliverable: "Node-RED Multi-Protocol Edge Gateway Normalizing Modbus & OPC UA into Sparkplug B / UNS",
      resumeBullet: "Built a multi-protocol industrial edge gateway in Node-RED and Java ingesting Modbus TCP and OPC UA, applying deadband filtering and ISA-95 contextualization before publishing to the UNS.",
      interviewQ: "Why is a dual-NIC (two Ethernet port) industrial PC standard practice for an edge gateway?",
      interviewA: "It allows physical and logical network segmentation: NIC 1 connects to the isolated, non-routable PLC subnet (Level 1) with no gateway to the internet, while NIC 2 connects to the Level 3/3.5 DMZ to publish outbound MQTT. The PLC network never touches the corporate LAN directly."
    },
    extraQuiz: [
      {q:"In edge computing terminology, what do 'Southbound' and 'Northbound' mean?",options:["Geographic compass directions","Southbound connects down to field devices/PLCs; Northbound connects up to enterprise brokers/cloud","Southbound is Wi-Fi; Northbound is serial","Download vs. upload speed"],a:1,why:"Southbound faces lower Purdue levels (0–1); Northbound faces higher levels (3–4/cloud)."},
      {q:"Which open-source tool provides a browser-based visual flow editor widely used on industrial gateways?",options:["Node-RED","GCC","DFSORT","Wireshark"],a:0,why:"Node-RED provides visual flow programming with thousands of industrial nodes."},
      {q:"What is the main risk of logging verbose debug messages every millisecond to a cheap SD card on an edge gateway?",options:["Flash memory wear-out corrupting the filesystem within months","Higher voltage","Slower Modbus baud rate","Too many colors on screen"],a:0,why:"High-frequency writes wear out consumer SD flash cells; industrial gateways use RAM logs, log rotation, or industrial eMMC/SSD."}
    ]
  },

  containers: {
    analogy: "In the old days, installing software on 50 factory gateways meant plugging a keyboard into each box, installing Java or Python, fixing missing libraries, and praying that Gateway #12 wasn't running a slightly different version than Gateway #1. <b>Containers (Docker / Podman)</b> work like standardized steel shipping containers: you pack your application and exact library versions into a sealed image once. Whether you drop that container onto a developer laptop, a Raspberry Pi, or 200 factory gateways managed by <b>K3s (lightweight Kubernetes)</b>, it runs identically every time.",
    glossary: [
      ["Container Image vs. Container", "An Image is the read-only sealed template/blueprint; a Container is the live running process started from that image."],
      ["Multi-Stage Dockerfile", "A build recipe where Stage 1 compiles your code using heavy tools (JDK + Maven), and Stage 2 copies <i>only</i> the finished JAR into a tiny runtime image."],
      ["K3s", "A certified Kubernetes distribution packed into a single binary under 100 MB, built specifically for edge gateways and IoT appliances."],
      ["GitOps (Flux / Argo CD)", "Instead of SSH-ing into 100 factories to update containers, you commit the new version number to Git, and each factory gateway pulls the update automatically."],
      ["SBOM (Software Bill of Materials)", "A complete ingredient list of every open-source library inside your container image, used by scanners like Trivy to spot security flaws."]
    ],
    beginnerGuide: "<p><b>3 Golden Rules for Containers on Industrial Edge Gateways:</b></p><ul><li><b>Always set memory limits (<code>mem_limit: 256m</code> &amp; <code>-XX:MaxRAMPercentage=70</code>):</b> If one container has a memory leak without a limit, it can starve the whole gateway OS and drop connectivity for the entire line.</li><li><b>Run as a non-root user (<code>USER app</code>):</b> If an attacker exploits a flaw in your app, they shouldn't automatically gain <code>root</code> control over the gateway host.</li><li><b>Build for both CPU architectures (<code>linux/amd64</code> and <code>linux/arm64</code>):</b> Many industrial PCs use Intel (<code>amd64</code>), while compact DIN-rail gateways use ARM (<code>arm64</code>). <code>docker buildx</code> builds both at once!</li></ul>",
    profile: {
      skills: ["Docker & Rootless Podman", "Multi-Stage & Multi-Arch (ARM64/AMD64) Builds", "K3s Lightweight Kubernetes & Helm", "GitOps Fleet Management & Trivy SBOM Scanning"],
      deliverable: "Docker Compose & K3s Helm Edge Stack with Multi-Stage Java Gateway (<150 MB) and Trivy Security Scan",
      resumeBullet: "Containerized a full IIoT edge stack (EMQX, Node-RED, InfluxDB, custom Java gateway) using multi-stage multi-arch Dockerfiles, K3s Helm charts, and automated Trivy SBOM vulnerability scanning.",
      interviewQ: "Why is pull-based GitOps (like Flux or Argo CD) better than push-based SSH scripts for updating 200 factory edge gateways?",
      interviewA: "First, security: pull-based GitOps requires zero inbound firewall ports opened into the factory OT network—the gateway reaches out over HTTPS. Second, resilience: if Factory #14 is offline during a maintenance window, it automatically reconciles to the desired Git state as soon as its connection returns."
    },
    extraQuiz: [
      {q:"Why should you set -XX:MaxRAMPercentage=70 and container memory limits on a Java edge container?",options:["To make the font larger","So the JVM respects the container's memory ceiling instead of consuming all host RAM and triggering an OOM kill","To disable garbage collection","To open port 1883"],a:1,why:"Explicit container limits + MaxRAMPercentage keep the JVM safely within its memory budget."},
      {q:"What command builds a single container image manifest that runs on both Intel x86 industrial PCs and ARM64 gateways?",options:["docker buildx build --platform linux/amd64,linux/arm64","docker ps","git commit","ping localhost"],a:0,why:"Docker Buildx builds multi-architecture OCI images."},
      {q:"What is an SBOM (Software Bill of Materials)?",options:["A hardware invoice for PLCs","A machine-readable inventory of all software components and libraries inside an artifact/container","A JCL dataset","A Modbus function code"],a:1,why:"SBOMs list every dependency for vulnerability tracking and Cyber Resilience Act compliance."}
    ]
  },

  tsdb: {
    analogy: "A normal relational database (like standard MySQL for an online shop) is built to update a customer's shipping address or look up an order by ID. An industrial plant is completely different: 1,000 sensors fire new readings every second, you almost never go back to edit Tuesday's temperature, and operators always ask time-window questions (<i>'Show me the 5-minute average motor current over the last 24 hours'</i>). <b>Time-Series Databases (InfluxDB, TimescaleDB)</b> are purpose-built engines that organize disk storage by time chunks, compress steady readings by 90%+, and automatically summarize old data.",
    glossary: [
      ["Measurement / Hypertable", "The logical table holding time-series records (e.g., <code>motor_telemetry</code>)."],
      ["Tags (Indexed Metadata)", "Low-cardinality labels used to filter and group series, such as <code>site=berlin</code>, <code>line=L2</code>, <code>machine=filler01</code>."],
      ["Fields (Measured Values)", "The actual numeric or boolean sensor readings that change every second, such as <code>temperature=72.4, rpm=1480</code>."],
      ["Cardinality", "The total number of unique combinations of Tag values. High cardinality (putting unique IDs or floats into Tags) bloats memory!"],
      ["Downsampling & Retention Policy", "Automatically keeping 1-second raw data for 14 days, 1-minute averages for 1 year, and 1-hour averages for 10 years."]
    ],
    beginnerGuide: "<p><b>The #1 Rule of Time-Series Schema Design (Tags vs. Fields):</b></p><p>When designing an InfluxDB or TimescaleDB schema, ask yourself: <i>'Will I put this in a WHERE filter or GROUP BY dropdown in Grafana, and does it have a small, bounded list of possible values?'</i></p><ul><li><b>YES → Make it a TAG:</b> <code>site</code>, <code>area</code>, <code>line</code>, <code>asset_id</code>, <code>sensor_type</code> (e.g., 500 machines = 500 series. Fast!).</li><li><b>NO → Make it a FIELD:</b> <code>temperature</code>, <code>pressure</code>, <code>vibration_rms</code>, <code>batch_uuid</code>, <code>order_id</code> (varies constantly!).</li></ul>",
    profile: {
      skills: ["Time-Series Schema Modeling & Cardinality Control", "InfluxDB & TimescaleDB (Hypertables)", "Telegraf Zero-Code Ingestion", "Grafana Dashboards & Alerting"],
      deliverable: "Telegraf → InfluxDB/TimescaleDB Pipeline with Downsampling Tasks & Live Grafana OEE Dashboard",
      resumeBullet: "Designed a low-cardinality time-series ingestion pipeline using Telegraf, InfluxDB/TimescaleDB, automated retention/downsampling policies, and real-time Grafana operational dashboards.",
      interviewQ: "A junior developer puts order_id, raw_timestamp_ms, and temperature as Tags in InfluxDB. Two weeks later, the database crashes with Out-Of-Memory. Why?",
      interviewA: "Runaway series cardinality! InfluxDB indexes every unique combination of Tags in memory. Putting unbounded values like timestamps, UUIDs, or floating-point readings into Tags creates millions of unique series. Only bounded metadata (site, line, asset) belong in Tags; variable readings belong in Fields."
    },
    extraQuiz: [
      {q:"Which of the following should be stored as a Field (not an indexed Tag) in InfluxDB?",options:["site='berlin'","line='packaging_1'","temperature=72.4819","asset='pump_02'"],a:2,why:"Continuous numeric measurements belong in Fields; indexing them as Tags causes cardinality explosion."},
      {q:"What tool from InfluxData can subscribe to MQTT/OPC UA/Modbus and write to InfluxDB or TimescaleDB using only a configuration file?",options:["Telegraf","Wireshark","IEFBR14","Notepad"],a:0,why:"Telegraf is a plugin-driven server agent for collecting and writing metrics."},
      {q:"Why do industrial historians and TSDBs use Retention Policies paired with Continuous Aggregates (Downsampling)?",options:["To delete all company data","To keep high-resolution raw data for short-term troubleshooting while storing compact 1-minute/1-hour rollups for multi-year trend analysis","Because disks can only hold 100 rows","To slow down queries"],a:1,why:"Tiered retention balances diagnostic granularity with long-term storage cost."}
    ]
  },

  fabric: {
    analogy: "Think of an <b>MQTT Broker</b> as a live intercom system: great for connecting thousands of small devices across shaky factory connections and broadcasting what is happening <i>right now</i>. Think of <b>Apache Kafka</b> as an indestructible, high-speed TiVo DVR recorder for the entire enterprise: every event from every factory is written in strict order onto an immutable tape (a partitioned log) that can be paused, rewound, and replayed days later by analytics jobs, AI models, and Mainframe ERP connectors without slowing down the factory.",
    glossary: [
      ["MQTT-to-Kafka Bridge", "A connector that takes live factory MQTT messages and writes them durably into Apache Kafka topics for enterprise analytics."],
      ["Kafka Partition & Message Key", "Kafka splits a topic into parallel lanes (Partitions). Giving every message from <code>Machine_04</code> the Key <code>'Machine_04'</code> guarantees all its events stay in strict chronological order in the same lane."],
      ["Consumer Group", "A team of worker apps sharing the work of reading a Kafka topic; each worker reads a subset of partitions, and Kafka tracks their bookmark (Offset)."],
      ["Log Compaction", "A special Kafka topic mode that keeps the most recent message for every unique Key—acting like a durable, replayable state table."],
      ["Schema Registry", "A central rulebook (using Avro, Protobuf, or JSON Schema) ensuring producers can't accidentally publish broken data formats that crash consumers."]
    ],
    beginnerGuide: "<p><b>Do I Need MQTT, Kafka, or Both?</b></p><ul><li><b>At the Edge &amp; Plant Level (Southbound to UNS):</b> Always use <b>MQTT (+ Sparkplug B)</b>. Devices need lightweight keep-alives, Last Will death certificates, and hierarchical topic wildcards (<code>+</code>, <code>#</code>).</li><li><b>At the Multi-Plant / Enterprise Data Backbone:</b> Bridge MQTT into <b>Apache Kafka</b> (or Redpanda). Kafka lets your Time-Series DB, your Snowflake/Databricks Data Lake, and your Mainframe MQ Sink each consume the stream independently at their own speed—if the data lake goes down for 4 hours, it simply resumes from its Kafka offset with zero data loss!</li></ul>",
    profile: {
      skills: ["Enterprise MQTT Clustering (HiveMQ/EMQX)", "Apache Kafka Architecture & Partitioning", "MQTT-to-Kafka Bridging", "Stream Processing (Kafka Streams / Flink) & Schema Registry"],
      deliverable: "Multi-Site Bridged MQTT Broker Fabric Feeding Apache Kafka with Stream Window Aggregation",
      resumeBullet: "Architected a multi-site MQTT-to-Apache Kafka event fabric preserving per-asset chronological ordering via partition keys and computing real-time rolling KPIs with Kafka Streams.",
      interviewQ: "Why shouldn't 50,000 field sensors connect directly to Apache Kafka over cellular/WAN instead of an MQTT broker?",
      interviewA: "Kafka's protocol is designed for high-throughput, stable data-center networks with relatively few, heavy clients; it lacks native Last Will & Testament, lightweight keep-alives, and fine-grained hierarchical wildcard subscriptions. An MQTT broker cluster handles millions of flaky edge connections and bridges cleanly into Kafka."
    },
    extraQuiz: [
      {q:"If two independent applications (e.g., an InfluxDB writer and a Mainframe MQ bridge) both need to receive 100% of the messages from a Kafka topic, how should they be configured?",options:["Put them in the same Consumer Group","Give each application its own distinct Consumer Group ID","Delete the topic after reading","Use only 1 byte per message"],a:1,why:"Each Consumer Group receives a full independent copy of the topic stream; instances within the same group split partitions."},
      {q:"What happens in Kafka if you publish messages with a null key across a topic with 12 partitions?",options:["Messages are distributed across partitions without guaranteeing chronological order for a specific machine","Kafka crashes","All messages go to partition 0 only","Messages are encrypted"],a:0,why:"Without an asset key, records for the same machine can land on different partitions and be consumed out of order."},
      {q:"What is the role of a Schema Registry in an industrial Kafka architecture?",options:["It stores Wi-Fi passwords","It enforces data contracts (Protobuf/Avro/JSON Schema) and version compatibility between producers and consumers","It replaces PLCs","It cools the server room"],a:1,why:"Schema Registry prevents breaking schema changes from corrupting downstream pipelines."}
    ]
  },

  cloud: {
    analogy: "If the Edge Gateway is the on-site plant manager, <b>Cloud IoT &amp; Digital Twins</b> are the global headquarters looking across all 30 factories worldwide. Instead of streaming noisy millisecond ticks to the cloud (which would cost a fortune), each plant sends clean, summarized telemetry and events. In the cloud, a <b>Digital Twin (like the Industry 4.0 Asset Administration Shell)</b> acts as a live 3D/digital passport for every physical machine—combining its serial number, CAD manuals, live health score, and carbon footprint in one standardized API.",
    glossary: [
      ["Device Shadow / Device Twin", "A JSON document stored in the cloud that remembers a device's <code>reported</code> state and holds any <code>desired</code> configuration changes until the device comes online."],
      ["DPS / Fleet Provisioning", "Zero-touch onboarding where a new gateway boots up at a factory, presents its hardware X.509 certificate, and is automatically assigned to the right cloud account."],
      ["Medallion Lakehouse (Bronze / Silver / Gold)", "Organizing cloud data in 3 stages: Bronze (raw archive), Silver (cleaned &amp; joined with ERP context), and Gold (executive KPIs like OEE &amp; energy/part)."],
      ["Asset Administration Shell (AAS / IEC 63278)", "The official Industry 4.0 Digital Twin standard—a vendor-neutral digital file/API describing every aspect of an industrial asset."]
    ],
    beginnerGuide: "<p><b>How to Avoid a $50,000 Surprise Cloud IoT Bill:</b></p><p>Cloud IoT brokers (AWS IoT Core, Azure IoT Hub) bill by the number of messages and message size chunks (e.g., every 4 KB or 5 KB). If 100 machines each publish 50 tags individually every 100 ms, that is <code>50,000 msgs/sec = 130 billion messages/month</code>! Instead:</p><ol><li>Use <b>Report-by-Exception (Deadband)</b> at the edge so unchanged tags aren't sent.</li><li><b>Batch multiple readings</b> into a single compressed payload sent every 5–60 seconds for historical analytics, sending only critical alarms immediately.</li></ol>",
    profile: {
      skills: ["AWS IoT Core / SiteWise & Azure IoT Hub", "X.509 Fleet Provisioning & Device Shadows/Twins", "Medallion Lakehouse (Parquet/Iceberg)", "Asset Administration Shell (IEC 63278 / Eclipse BaSyx)"],
      deliverable: "Cloud IoT Bridge with X.509 Auth, Cost-Calculation Model & Eclipse BaSyx Digital Twin (AAS)",
      resumeBullet: "Integrated plant MQTT telemetry with cloud IoT services using X.509 mutual TLS, device twins, and an IEC 63278 Asset Administration Shell (AAS) digital twin on Eclipse BaSyx.",
      interviewQ: "How do you update a configuration parameter (like a sampling rate) on an edge gateway that only connects to the cloud intermittently?",
      interviewA: "Write the new value into the desired section of the cloud Device Shadow / Twin. When the gateway reconnects, it receives the delta between desired and reported, applies the new sampling rate locally, and updates its reported state to confirm synchronization."
    },
    extraQuiz: [
      {q:"How do you dramatically reduce cloud IoT ingestion costs without losing analytical value?",options:["Turn off all sensors","Apply deadband filtering, edge aggregation, and message batching before sending to the cloud","Send one XML file per millisecond","Use unencrypted HTTP"],a:1,why:"Edge filtering and batching cut message counts by 90–99%."},
      {q:"In a Cloud Device Shadow/Twin, what is the difference between desired and reported state?",options:["desired is the target config set by the cloud app; reported is the actual current state confirmed by the edge device","They are identical","desired is for sensors; reported is for mainframes","reported is deleted every second"],a:0,why:"The delta between desired and reported drives asynchronous device configuration."},
      {q:"What is Eclipse BaSyx?",options:["A PLC brand","The open-source reference platform for the Industry 4.0 Asset Administration Shell (AAS / IEC 63278)","A JCL utility","A soldering iron"],a:1,why:"Eclipse BaSyx implements standardized AAS digital twins."}
    ]
  },

  security: {
    analogy: "Imagine a medieval castle where the outer walls were never built because nobody had roads to reach it—and inside the castle, none of the doors have locks because everyone trusted each other. That is a legacy factory network! Protocols like Modbus and S7 have <b>zero passwords or encryption</b>. When you connect that factory to the internet for IIoT without protection, it's like building a 6-lane highway straight into the unlocked castle. <b>IEC 62443</b> teaches you how to divide the castle into <b>Zones</b> (locked rooms grouped by risk) connected only by guarded <b>Conduits</b> (encrypted, firewall-inspected tunnels).",
    glossary: [
      ["IEC 62443", "The global standard for Industrial Automation and Control Systems (IACS) cybersecurity."],
      ["Zone & Conduit", "A Zone is a group of assets sharing the same security level (e.g., Packaging Line 1 PLCs); a Conduit is the strictly controlled network pathway between two Zones."],
      ["Security Levels (SL 1 to SL 4)", "IEC 62443's protection scale: SL 1 = protection against casual accidents; SL 2 = simple hackers; SL 3 = organized cybercriminals; SL 4 = nation-state attacks."],
      ["Industrial DMZ (Level 3.5)", "A buffer zone between OT and IT ensuring no traffic ever flows directly from corporate laptops onto the PLC network."],
      ["Outbound-Only Architecture", "The edge gateway initiates an encrypted TLS connection <i>out</i> to the broker in the DMZ/cloud; zero inbound ports are opened into the factory floor."],
      ["Data Diode", "Hardware that physically allows light/data to travel in only one direction (out of the plant), making remote hacking physically impossible."]
    ],
    beginnerGuide: "<p><b>The 5 Non-Negotiable Security Rules for Any IIoT Project:</b></p><ol><li><b>Never expose PLC ports (502, 102, 44818) to IT or the Internet:</b> Search engines like Shodan scan the internet for port 502 constantly.</li><li><b>Enforce Outbound-Only Connections from OT:</b> Your gateway in Level 2/3 initiates an outbound TLS connection (port 8883) to the DMZ broker. Firewalls block all inbound connection attempts into OT.</li><li><b>Mutual TLS (mTLS) &amp; Topic ACLs:</b> Every gateway gets its own X.509 certificate and an Access Control List (ACL) so <code>Gateway-Line1</code> can only publish to <code>plant/line1/#</code> and cannot spoof <code>plant/line2/#</code>.</li><li><b>Keep Safety Systems (SIS) Independent:</b> Never bridge safety controllers directly to IT networks (the lesson of the TRITON attack).</li><li><b>Scan &amp; Sign Everything (CRA / NIS2):</b> Generate an SBOM and scan container images before deploying.</li></ol>",
    profile: {
      skills: ["IEC 62443 Zones, Conduits & Security Levels (SL 1–4)", "Level 3.5 Industrial DMZ & Outbound-Only Design", "mTLS PKI & Broker Topic ACLs", "EU NIS2 & Cyber Resilience Act (CRA) Compliance"],
      deliverable: "IEC 62443 Threat Model, Zones & Conduits Diagram, mTLS Broker Setup & SBOM Audit Report",
      resumeBullet: "Hardened an IIoT edge-to-cloud architecture per ISA/IEC 62443-3-3 using Zones & Conduits segmentation, outbound-only mTLS 1.3, topic-level broker ACLs, and automated SBOM vulnerability scanning.",
      interviewQ: "An IT manager asks you to open inbound firewall port 4840 from the cloud straight to a factory PLC so a cloud app can poll OPC UA directly. How do you respond?",
      interviewA: "Explain that opening inbound ports from the internet/cloud into Purdue Level 1 violates IEC 62443 segmentation and exposes deterministic PLCs to external attacks. Instead, place an edge gateway or DMZ broker at Level 3/3.5 that reads the PLC locally and initiates an outbound-only mTLS connection to the cloud."
    },
    extraQuiz: [
      {q:"In IEC 62443, what do Security Levels SL 1 through SL 4 measure?",options:["The number of firewalls","The required resistance against increasing attacker capability and motivation (from accidental misuse at SL 1 to nation-state adversaries at SL 4)","Wi-Fi signal strength","PLC scan speed"],a:1,why:"SL 1–4 define protection against progressively sophisticated threat actors."},
      {q:"Why should each MQTT edge gateway have a Topic Access Control List (ACL) in addition to a valid TLS certificate?",options:["So a compromised gateway on Line 1 is restricted to its own topic subtree and cannot publish fake commands to Line 2","To make payloads smaller","Because MQTT requires ACLs to connect","To replace DNS"],a:0,why:"Least-privilege topic ACLs prevent lateral spoofing across the Unified Namespace."},
      {q:"What device physically enforces one-way-only data transmission out of a high-security plant (such as a power station)?",options:["A hub","A Hardware Data Diode","A crossover cable","A Modbus slave"],a:1,why:"A data diode uses an LED transmitter and photoreceptor with no return path, guaranteeing unidirectional flow."}
    ]
  },

  analytics: {
    analogy: "Imagine listening to your car engine. An experienced mechanic doesn't wait for the engine to explode on the highway—they hear a faint, high-pitched whine from a worn wheel bearing weeks in advance. <b>Industrial Analytics &amp; Predictive Maintenance</b> gives every machine an electronic stethoscope. Using <b>FFT (Fast Fourier Transform)</b>, we split a messy vibration waveform into individual musical notes (frequencies) so a machine-learning model can spot a microscopic crack in a ball bearing 20 days before it fails, and run that model right on the Edge Gateway using <b>ONNX</b>.",
    glossary: [
      ["Reactive vs. Preventive vs. Predictive Maintenance", "Reactive = fix after it breaks; Preventive = replace every 6 months whether worn or not; Predictive (PdM) = replace when sensor health data shows wear approaching failure."],
      ["RMS & Kurtosis (Time-Domain Features)", "RMS measures overall vibration energy; Kurtosis measures 'spikiness' (impacts from a cracked bearing ball hitting a race)."],
      ["FFT (Fast Fourier Transform)", "Math transform that converts a time waveform into a frequency spectrum, revealing exact bearing/gear fault frequencies."],
      ["RUL (Remaining Useful Life)", "A regression model prediction estimating how many hours or cycles a machine has left before failure."],
      ["ONNX Runtime", "An open standard that lets you train a model in Python (scikit-learn/PyTorch) and run it at lightning speed in Java, C++, or Python on an edge gateway."]
    ],
    beginnerGuide: "<p><b>How to Build an Industrial Predictive Maintenance Pipeline Without a PhD:</b></p><ol><li><b>Don't feed raw 20 kHz waveforms directly into a basic ML model:</b> Compute physically meaningful summary numbers over 1-second windows first: <code>RMS</code>, <code>Peak-to-Peak</code>, <code>Kurtosis</code>, and <code>FFT Band Energy</code>.</li><li><b>Start with Unsupervised Anomaly Detection (Isolation Forest):</b> In real factories, you rarely have 500 labeled examples of machines exploding! You have tons of 'normal' data. Train an Isolation Forest or Autoencoder on healthy operation to flag deviations early.</li><li><b>Avoid Time-Series Data Leakage:</b> Never use random <code>train_test_split</code> on time-series sensor data (putting Tuesday 10:01 in train and Tuesday 10:02 in test cheats!). Always split by <i>entire machine run</i> or by a strict cutoff timestamp.</li></ol>",
    profile: {
      skills: ["Vibration Signal Processing (FFT, RMS, Kurtosis)", "Anomaly Detection (Isolation Forest) & RUL", "Time-Series Feature Engineering", "Edge MLOps with ONNX Runtime"],
      deliverable: "Bearing Fault Feature Extractor, RUL/Anomaly Model & Edge ONNX Inference Microservice",
      resumeBullet: "Developed a predictive maintenance pipeline extracting time- and frequency-domain vibration features (RMS, Kurtosis, FFT) and deploying an ONNX anomaly/RUL model to the edge publishing real-time asset health to Grafana.",
      interviewQ: "Why is using a random 80/20 train/test split on 1-second time-series sensor data a major mistake in predictive maintenance?",
      interviewA: "Temporal data leakage! Adjacent seconds of a slow-changing temperature or vibration trend are nearly identical, so the model memorizes the specific run and scores 99% in testing but fails completely on a new machine. You must split by distinct machine/run IDs or chronological time blocks."
    },
    extraQuiz: [
      {q:"Why shouldn't you use a random train_test_split on sequential 1-second sensor readings from the same machine degradation run?",options:["It causes temporal data leakage because adjacent seconds are highly correlated, inflating test accuracy unrealistically","Python doesn't support random numbers","It deletes the dataset","It uses too much RAM"],a:0,why:"Time-series splits must be grouped by distinct run/asset ID or chronological cutoff."},
      {q:"Which time-domain vibration feature specifically measures 'spikiness' caused by repetitive impacts in an early bearing defect?",options:["Mean","Kurtosis / Crest Factor","Minimum","Length"],a:1,why:"Kurtosis and Crest Factor are highly sensitive to impulsive bearing impacts before overall RMS rises."},
      {q:"Why do we often start with unsupervised Anomaly Detection (e.g., Isolation Forest) in real factories instead of supervised failure classification?",options:["Because labeled failure events are rare in production, whereas normal healthy operating data is abundant","Because supervised learning is illegal","Because sensors only output text","To use more cloud storage"],a:0,why:"Most industrial assets have few recorded run-to-failure histories, making unsupervised baseline modeling practical on day one."}
    ]
  },

  capstone: {
    analogy: "Think of the first 19 modules as learning every instrument in an orchestra—strings, brass, percussion, and sheet music. <b>Module 19 (The Capstone)</b> is your recorded concert performance. Hiring managers in IIoT rarely hire based on buzzwords on a CV; when you show them a 4-minute video and a GitHub repository where <code>docker compose up</code> spins up a simulated PLC, an Edge Gateway, a Sparkplug B Unified Namespace, a Time-Series Database with live Grafana OEE dashboards, an ONNX predictive maintenance model, AND an IBM MQ/Mainframe batch connector, you immediately move to the top 1% of applicants.",
    glossary: [
      ["Smart Factory in a Box", "Your self-contained, dockerized end-to-end IIoT reference architecture that runs on a single laptop for live interview demos."],
      ["ADR (Architecture Decision Record)", "A short markdown note in your repo explaining <i>why</i> you chose a technology (e.g., 'Why Sparkplug B over raw JSON', 'Why TimescaleDB over MySQL')."],
      ["C4 / Purdue Architecture Diagram", "The visual map at the top of your README showing every container, protocol, port, and security zone."],
      ["STAR Interview Method", "Answering behavioral/technical questions with Situation, Task, Action, and Quantified Result."]
    ],
    beginnerGuide: "<p><b>How to Present Yourself as a Competent IIoT Engineer (Even Without Prior Factory Job Titles):</b></p><ul><li><b>Lead with Architecture &amp; Evidence:</b> Put your Purdue/UNS diagram and a 2-minute animated GIF or Loom video at the very top of your GitHub README.</li><li><b>Highlight Your Unique Cross-Domain Superpower:</b> Very few candidates know <i>both</i> shop-floor protocols (Modbus, OPC UA, Sparkplug B) <i>and</i> enterprise/mainframe backbones (Java, Kafka, IBM MQ, JCL, PL/I). Position yourself as the <b>IT/OT &amp; Enterprise Integration Engineer</b> who bridges the entire company!</li></ul>",
    profile: {
      skills: ["End-to-End IIoT System Architecture", "Technical Documentation & ADRs", "Cross-Domain IT/OT/Mainframe Integration", "IIoT System Design Interview Mastery"],
      deliverable: "'Smart Factory in a Box' Full-Stack Capstone Repository, Architecture Decision Records & 4-Minute Demo Video",
      resumeBullet: "Architected and deployed 'Smart Factory in a Box', an end-to-end containerized IIoT platform integrating OpenPLC/Modbus/OPC UA, a Java/Node-RED Sparkplug B gateway, Kafka/InfluxDB/Grafana OEE analytics, ONNX predictive maintenance, and IBM MQ/z/OS batch reporting.",
      interviewQ: "Walk me through how you would design an IIoT architecture to connect 15 brownfield factories with mixed PLCs to a central analytics platform and mainframe ERP.",
      interviewA: "At each plant (Levels 1–2), deploy containerized edge gateways on a dual-NIC IPC polling legacy PLCs via PLC4X/OPC UA. Normalize and publish via Sparkplug B to a local clustered MQTT broker (plant UNS) with store-and-forward. Across Level 3.5 DMZ (outbound mTLS per IEC 62443), bridge aggregated plant topics to enterprise Kafka. From Kafka, fan out to TimescaleDB/Grafana for real-time OEE, a Lakehouse for ML training, and IBM MQ/z/OS Connect for transactional ERP order completion."
    },
    extraQuiz: [
      {q:"When a hiring manager opens your Capstone GitHub repository, what should they see in the first 10 seconds?",options:["Thousands of lines of uncommented code","A clear Purdue/UNS architecture diagram, a short demo video/GIF, a one-command quickstart (docker compose up), and links to ADRs","Only a license file","A zip file with no README"],a:1,why:"Visual architecture + reproducible demo immediately proves end-to-end engineering competence."},
      {q:"In an IIoT system design interview, what is the best first step before naming specific cloud tools?",options:["Clarify requirements: brownfield protocols, latency/bandwidth constraints, offline resilience needs, security zones (IEC 62443), and target business KPIs (e.g., OEE, ERP sync)","Immediately say 'Kubernetes'","Write JCL","Ask about office snacks"],a:0,why:"Senior engineers anchor technical choices in physical plant constraints and business value."},
      {q:"What unique advantage does combining OT (OPC UA / Sparkplug B), Edge/Java, and Mainframe (z/OS / JCL / PL/I / MQ) give your career profile?",options:["None","You can bridge the complete ISA-95 Level 0-to-Level 4 lifecycle—from physical sensor to enterprise ERP system of record—a rare skill set in manufacturing and utilities","It lets you skip testing","It replaces Ethernet cables"],a:1,why:"Full-spectrum Level 0 to Level 4 integration is one of the rarest and highest-impact profiles in industrial enterprises."}
    ]
  }
};
