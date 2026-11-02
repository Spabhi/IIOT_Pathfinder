/* Modules 0–9 : Foundations, Java, Mainframe, OT basics, protocols */
window.MODULES_PART1 = [
{
id:"orientation", phase:"Phase 1 · Foundations", icon:"🧭", title:"IIoT Orientation & Industry 4.0", hours:6, level:"Beginner",
summary:"Understand what the Industrial Internet of Things is, why IT/OT convergence matters, and the reference models (ISA-95, Purdue, RAMI 4.0) that every IIoT architect uses.",
objectives:["Differentiate consumer IoT from Industrial IoT","Explain IT/OT convergence and its challenges","Describe the Purdue model levels 0–5 and ISA-95","Name core IIoT use-cases and the roles in the job market"],
lessons:[
{title:"What is IIoT?",html:`<p>The <b>Industrial Internet of Things</b> applies connected sensors, machines, edge computing and cloud analytics to industrial operations – manufacturing, energy, oil & gas, utilities, pharma, logistics. Unlike consumer IoT, IIoT systems have strict requirements:</p>
<table><tr><th>Aspect</th><th>Consumer IoT</th><th>Industrial IoT</th></tr>
<tr><td>Failure impact</td><td>Inconvenience</td><td>Safety incidents, production loss, environmental damage</td></tr>
<tr><td>Lifetime</td><td>2–5 years</td><td>15–30 years (brownfield equipment)</td></tr>
<tr><td>Latency</td><td>Seconds OK</td><td>ms–µs (deterministic control)</td></tr>
<tr><td>Protocols</td><td>Wi-Fi, BLE, HTTP</td><td>Modbus, PROFINET, OPC UA, MQTT/Sparkplug, EtherNet/IP</td></tr>
<tr><td>Priority</td><td>Confidentiality</td><td>Availability → Integrity → Confidentiality</td></tr></table>`},
{title:"Industry 4.0 and the industrial revolutions",html:`<p>1.0 steam mechanisation → 2.0 electrification/mass production → 3.0 electronics & PLCs (1969 Modicon 084) → <b>4.0 cyber-physical systems</b>: connectivity, data, AI, digital twins. Germany's <b>RAMI 4.0</b> and the US <b>IIRA</b> (Industrial Internet Reference Architecture, from the Industry IoT Consortium) formalise these architectures. "Industry 5.0" adds human-centricity, resilience and sustainability.</p>`},
{title:"The Purdue model & ISA-95",html:`<p>The <b>Purdue Enterprise Reference Architecture</b> (adopted by ISA-95 / IEC 62264) layers an industrial enterprise:</p>
<ul><li><b>Level 0</b> – physical process: sensors, actuators, motors, valves</li><li><b>Level 1</b> – basic control: PLCs, RTUs, drives</li><li><b>Level 2</b> – supervisory: SCADA, HMI, DCS operator stations</li><li><b>Level 3</b> – manufacturing operations: MES, historians, batch (ISA-88)</li><li><b>Level 3.5</b> – industrial DMZ</li><li><b>Level 4/5</b> – business: ERP (SAP, often on mainframes), enterprise IT, cloud</li></ul>
<p>Traditional data flows strictly up/down level by level ("automation pyramid"). Modern IIoT flattens this with a <b>Unified Namespace (UNS)</b> – a central event-driven hub (usually MQTT) where every layer publishes and subscribes. You will build one in later modules.</p>`},
{title:"Use cases & value",html:`<ul><li><b>OEE</b> (Overall Equipment Effectiveness = Availability × Performance × Quality) monitoring</li><li><b>Predictive maintenance</b> – vibration/temperature analysis to predict failures</li><li><b>Condition monitoring</b>, energy management, quality traceability (genealogy)</li><li><b>Remote operations</b> of pipelines, wind farms, substations</li><li><b>Digital twins</b> for simulation and optimisation</li></ul>`},
{title:"Career map",html:`<p>Typical roles: IIoT Developer, Edge/Integration Engineer, OT Network/Security Engineer, Industrial Data Engineer, Solutions Architect, Mainframe Integration Developer. Employers value a "T-shaped" profile: broad across IT/OT and deep in 1–2 areas (e.g., Java + OPC UA, or Mainframe + MQ integration). This roadmap is designed to produce exactly that profile.</p>`}
],
lab:{title:"Lab: Map a real plant",html:`<ol><li>Choose a factory you know or watch a "how it's made" video.</li><li>Draw the Purdue levels 0–4 and place every device/system you can identify.</li><li>Mark every data flow and guess the protocol used.</li><li>Identify 3 IIoT use-cases with an estimated business value (e.g., 5% OEE gain).</li><li>Save the diagram (draw.io / Excalidraw) – it's the first item in your portfolio repository.</li></ol>`},
resources:[{name:"Industry IoT Consortium – IIRA",url:"https://www.iiconsortium.org/iira/"},{name:"ISA-95 overview (ISA)",url:"https://www.isa.org/standards-and-publications/isa-standards/isa-95-standard"},{name:"Plattform Industrie 4.0 – RAMI 4.0",url:"https://www.plattform-i40.de/"},{name:"Walker Reynolds – Unified Namespace explained (YouTube)",url:"https://www.youtube.com/@4.0Solutions"},{name:"Draw.io (free diagramming)",url:"https://app.diagrams.net/"}],
quiz:[
{q:"In OT security, which property usually has the highest priority?",options:["Confidentiality","Availability","Anonymity","Portability"],a:1,why:"OT ranks Availability first – stopping a process can be unsafe and costly."},
{q:"At which Purdue level do PLCs typically sit?",options:["Level 0","Level 1","Level 3","Level 4"],a:1,why:"Level 1 is basic control: PLCs, RTUs, drives."},
{q:"Which standard defines the enterprise–control system integration model (MES/ERP)?",options:["ISA-95","IEEE 802.11","ISO 9001","IEC 60601"],a:0,why:"ISA-95 / IEC 62264."},
{q:"OEE is calculated as…",options:["Availability + Performance + Quality","Availability × Performance × Quality","Uptime / Downtime","Output / Energy"],a:1,why:"OEE = A × P × Q."},
{q:"A Unified Namespace is best described as…",options:["A DNS server for PLCs","A central event-driven hub where all systems publish their current state","A naming convention for tags in Excel","A cloud billing account"],a:1,why:"The UNS is a single source of truth, typically MQTT-based."}
]},

{
id:"networking", phase:"Phase 1 · Foundations", icon:"🌐", title:"Networking, Linux & Electronics Basics", hours:14, level:"Beginner",
summary:"IIoT lives on networks and Linux edge devices. Master TCP/IP, industrial network topologies, Linux command line, and the basic electronics of sensors and signals.",
objectives:["Explain OSI/TCP-IP layers, subnets, VLANs, ports","Use Linux shell, systemd, networking tools","Understand 4–20 mA, 0–10 V, digital I/O, ADC resolution","Describe serial (RS-232/RS-485) vs Ethernet fieldbuses"],
lessons:[
{title:"TCP/IP essentials",html:`<p>Know the OSI model (Physical → Application) and the TCP/IP stack. Key facts for IIoT:</p><ul><li>IPv4 addressing, CIDR (<code>192.168.10.0/24</code>), gateways, DNS, DHCP (plants often use static IPs!)</li><li>TCP (reliable, ordered) vs UDP (fast, connectionless – used by PROFINET RT alternatives, DNP3 UDP, multicast discovery)</li><li>Well-known ports: Modbus TCP 502, OPC UA 4840, MQTT 1883 / 8883 (TLS), EtherNet/IP 44818, S7comm 102, DNP3 20000, BACnet 47808</li><li>VLANs, managed switches, NAT, firewalls; Time-Sensitive Networking (TSN, IEEE 802.1) for deterministic Ethernet</li></ul>`},
{title:"Industrial network topologies",html:`<p>Line/daisy-chain, star, and <b>ring</b> topologies (with MRP – Media Redundancy Protocol, or DLR – Device Level Ring) for redundancy. Physical media: copper, fibre, industrial M12 connectors, wireless (WirelessHART, ISA100.11a, private 5G, LoRaWAN for long-range low-power sensors).</p>`},
{title:"Linux for edge devices",html:`<p>Most gateways run Linux (Debian, Ubuntu Core, Yocto builds). Essential commands:</p><pre>ip a ; ip route            # interfaces and routes
ss -tulpn                  # listening ports
ping / traceroute / nc -vz 10.0.0.5 502   # connectivity to a Modbus device
sudo tcpdump -i eth0 port 1883 -w mqtt.pcap
systemctl status mosquitto ; journalctl -u mosquitto -f
chmod, chown, ssh-keygen, scp, cron, nano/vim</pre><p>Learn Wireshark – it decodes Modbus, OPC UA, MQTT, S7 and is the #1 debugging tool in OT.</p>`},
{title:"Sensors & signals",html:`<ul><li><b>Analog</b>: 4–20 mA current loop (noise-immune, "live zero" detects broken wires – 0 mA = fault), 0–10 V voltage</li><li><b>Digital I/O</b>: 24 VDC discrete signals, PNP/NPN sensors</li><li><b>ADC resolution</b>: a 12-bit ADC gives 4096 steps; scaling: <code>value = (raw - rawMin)/(rawMax-rawMin) × (engMax-engMin) + engMin</code></li><li>Sensor types: RTD/PT100 and thermocouples (temperature), pressure transmitters, flow meters, accelerometers (vibration), encoders, proximity sensors</li><li><b>Serial</b>: RS-232 (point to point), RS-485 (multi-drop, up to 32 nodes, 1200 m – used by Modbus RTU)</li><li>Smart sensors: HART (digital over 4–20 mA), IO-Link (point-to-point digital sensor protocol)</li></ul>`}
],
lab:{title:"Lab: Linux & packet capture",html:`<ol><li>Install WSL2 Ubuntu (Windows) or use a Raspberry Pi / VM.</li><li>Install tools: <code>sudo apt install net-tools tcpdump mosquitto mosquitto-clients</code></li><li>Run <code>mosquitto_sub -t test/# -v</code> in one shell and <code>mosquitto_pub -t test/a -m hello</code> in another.</li><li>Capture with tcpdump, open in Wireshark, find the CONNECT, PUBLISH packets.</li><li>Write a 4–20 mA scaling function (any language) converting 12 mA to a 0–10 bar pressure (answer: 5 bar).</li></ol>`},
resources:[{name:"Linux Journey (free)",url:"https://linuxjourney.com/"},{name:"Cisco NetAcad – Networking Basics (free)",url:"https://www.netacad.com/"},{name:"Wireshark User Guide",url:"https://www.wireshark.org/docs/"},{name:"RealPars – industrial automation videos",url:"https://www.youtube.com/@RealPars"},{name:"The Linux Command Line (free book)",url:"https://linuxcommand.org/tlcl.php"}],
quiz:[
{q:"What is the default TCP port for Modbus TCP?",options:["102","502","1883","4840"],a:1,why:"Modbus TCP uses port 502."},
{q:"Why is 4–20 mA preferred over 0–20 mA?",options:["It is cheaper","The 'live zero' allows detection of a broken wire","It is digital","It carries more power"],a:1,why:"0 mA indicates a fault rather than a valid minimum reading."},
{q:"A 12 mA signal on a 4–20 mA, 0–10 bar transmitter equals…",options:["6 bar","5 bar","7.5 bar","4 bar"],a:1,why:"(12-4)/16 × 10 = 5 bar."},
{q:"RS-485 is commonly used by…",options:["Modbus RTU","OPC UA","HTTP","Bluetooth"],a:0,why:"Modbus RTU typically runs over multi-drop RS-485."},
{q:"Which tool decodes industrial protocols from packet captures?",options:["Excel","Wireshark","Notepad","Git"],a:1,why:"Wireshark has dissectors for Modbus, OPC UA, MQTT, S7, etc."}
]},

{
id:"java1", phase:"Phase 2 · Programming", icon:"☕", title:"Java Programming Fundamentals", hours:30, level:"Beginner",
summary:"Java is the backbone of many industrial platforms (Eclipse Milo, Kura, Ignition, HiveMQ, Kafka). Learn the language, OOP, collections, exceptions and build tooling.",
objectives:["Write, compile and run Java 21 programs","Apply OOP: classes, interfaces, inheritance, records","Use collections, generics, streams and lambdas","Build projects with Maven/Gradle and test with JUnit 5"],
lessons:[
{title:"Setup and syntax",html:`<p>Install a JDK 21 LTS (Eclipse Temurin), an IDE (IntelliJ IDEA Community or VS Code) and Maven. Basic program:</p><pre>public class Hello {
    public static void main(String[] args) {
        double tempC = 72.4;
        String status = tempC > 70 ? "ALARM" : "OK";
        System.out.printf("Temperature %.1f °C -> %s%n", tempC, status);
    }
}</pre><p>Primitives (<code>int, long, double, boolean, byte</code>) vs reference types; control flow (<code>if, switch</code> expressions, <code>for, while</code>); <code>byte</code> and bit-manipulation matter in industrial protocols (registers are 16-bit!).</p>`},
{title:"Object-oriented design",html:`<pre>public interface Sensor { String id(); double read(); }

public record Reading(String sensorId, double value, java.time.Instant ts) {}

public class TemperatureSensor implements Sensor {
    private final String id; private final java.util.Random rnd = new java.util.Random();
    public TemperatureSensor(String id) { this.id = id; }
    public String id() { return id; }
    public double read() { return 20 + rnd.nextGaussian() * 2; }
}</pre><p>Concepts: encapsulation, inheritance, polymorphism, abstraction; interfaces vs abstract classes; <b>records</b> (immutable data carriers – perfect for telemetry); enums for machine states (<code>enum State { IDLE, RUNNING, FAULT }</code>); sealed classes.</p>`},
{title:"Collections, generics, streams",html:`<pre>List&lt;Reading&gt; readings = sensors.stream()
    .map(s -&gt; new Reading(s.id(), s.read(), Instant.now()))
    .toList();
Map&lt;String, Double&gt; avg = readings.stream()
    .collect(Collectors.groupingBy(Reading::sensorId, Collectors.averagingDouble(Reading::value)));</pre><p>Know <code>ArrayList, HashMap, LinkedHashMap, ArrayDeque, TreeMap</code>, <code>Optional</code>, and time APIs (<code>Instant, Duration</code>).</p>`},
{title:"Exceptions, I/O & bytes",html:`<p>Checked vs unchecked exceptions, try-with-resources for sockets/files. Byte handling for protocols:</p><pre>ByteBuffer buf = ByteBuffer.wrap(new byte[4]).order(ByteOrder.BIG_ENDIAN);
buf.putShort((short)0x41C8).putShort((short)0x0000);
float f = buf.flip().getFloat();   // two Modbus registers -> 25.0f</pre>`},
{title:"Build tools & testing",html:`<p>Maven standard layout (<code>src/main/java</code>, <code>src/test/java</code>), <code>pom.xml</code> dependencies, <code>mvn package</code> produces a JAR. Write JUnit 5 tests (<code>@Test, assertEquals</code>), log with SLF4J + Logback, use Git for version control from day one.</p>`}
],
lab:{title:"Lab: Sensor simulator in Java",html:`<ol><li>Create a Maven project <code>iiot-sim</code>.</li><li>Implement <code>Sensor</code> interface with Temperature, Pressure and Vibration implementations (random walk + noise).</li><li>Every second collect readings into <code>Reading</code> records and print JSON (use Jackson).</li><li>Add an alarm rule engine: thresholds per sensor type, with hysteresis.</li><li>Write 3 JUnit tests. Push to GitHub.</li></ol>`},
resources:[{name:"dev.java – official Java tutorials",url:"https://dev.java/learn/"},{name:"University of Helsinki MOOC – Java Programming (free)",url:"https://java-programming.mooc.fi/"},{name:"Baeldung Java guides",url:"https://www.baeldung.com/"},{name:"Maven in 5 minutes",url:"https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html"},{name:"JUnit 5 User Guide",url:"https://junit.org/junit5/docs/current/user-guide/"}],
quiz:[
{q:"Which Java construct is ideal for immutable telemetry data?",options:["record","abstract class","static block","Thread"],a:0,why:"Records are concise immutable data carriers."},
{q:"How many bits is a Java short (and a Modbus register)?",options:["8","16","32","64"],a:1,why:"Both are 16-bit."},
{q:"try-with-resources is used to…",options:["Speed up loops","Automatically close resources like sockets and files","Create threads","Define generics"],a:1,why:"Any AutoCloseable is closed automatically."},
{q:"Which command builds a JAR with Maven?",options:["mvn package","java build","javac -jar","gradle run"],a:0,why:"mvn package compiles, tests and packages."},
{q:"Collectors.groupingBy returns a…",options:["List","Map","Set","Stream"],a:1,why:"It groups elements into a Map keyed by the classifier."}
]},

{
id:"java2", phase:"Phase 2 · Programming", icon:"🚀", title:"Advanced Java for IIoT", hours:30, level:"Intermediate",
summary:"Concurrency, networking, reactive programming and the Java libraries used in industrial software: Eclipse Paho, HiveMQ client, Eclipse Milo, j2mod, Spring Boot.",
objectives:["Use threads, executors, CompletableFuture and virtual threads","Write socket and asynchronous network code","Build REST/microservices with Spring Boot or Quarkus","Use industrial Java libraries (Paho, Milo, j2mod)"],
lessons:[
{title:"Concurrency",html:`<p>Gateways poll hundreds of devices concurrently.</p><pre>try (var exec = Executors.newVirtualThreadPerTaskExecutor()) {
    devices.forEach(d -&gt; exec.submit(() -&gt; poll(d)));
}
ScheduledExecutorService sched = Executors.newScheduledThreadPool(2);
sched.scheduleAtFixedRate(this::publishTelemetry, 0, 1, TimeUnit.SECONDS);</pre><p>Learn <code>synchronized</code>, <code>ConcurrentHashMap</code>, <code>AtomicLong</code>, <code>BlockingQueue</code> (producer/consumer buffers for store-and-forward), <code>CompletableFuture</code> chaining, and Java 21 virtual threads.</p>`},
{title:"Networking & reactive",html:`<p>Raw <code>Socket</code>/<code>ServerSocket</code>, NIO channels, <b>Netty</b> (used by HiveMQ, Milo). Reactive streams (Project Reactor, RxJava) handle back-pressure for high-rate telemetry.</p>`},
{title:"Industrial Java libraries",html:`<table><tr><th>Library</th><th>Purpose</th></tr><tr><td>Eclipse Paho / HiveMQ MQTT Client</td><td>MQTT 3.1.1 / 5 clients</td></tr><tr><td>Eclipse Milo</td><td>OPC UA client & server SDK</td></tr><tr><td>j2mod / digitalpetri modbus</td><td>Modbus TCP/RTU master & slave</td></tr><tr><td>Eclipse Tahu</td><td>Sparkplug B reference implementation</td></tr><tr><td>Apache PLC4X</td><td>Unified API for S7, Modbus, EtherNet/IP, ADS…</td></tr><tr><td>Kafka clients, Apache Camel</td><td>Streaming & enterprise integration patterns</td></tr><tr><td>Eclipse Kura</td><td>OSGi-based IoT gateway framework</td></tr></table>
<pre>Mqtt5AsyncClient client = MqttClient.builder().useMqttVersion5()
    .identifier("gw-01").serverHost("localhost").buildAsync();
client.connect().thenCompose(ack -&gt; client.publishWith()
    .topic("plant1/line2/temp").payload("72.4".getBytes()).qos(MqttQos.AT_LEAST_ONCE).send());</pre>`},
{title:"Microservices",html:`<p>Spring Boot / Quarkus REST APIs, configuration via <code>application.yml</code>, health endpoints (Actuator), packaging into small containers (Jib, GraalVM native images for edge devices with low RAM). Apply clean architecture: protocol adapters → domain model → outbound connectors.</p>`}
],
lab:{title:"Lab: Multithreaded gateway skeleton",html:`<ol><li>Extend your simulator: run each sensor in a virtual thread pushing into a <code>BlockingQueue</code>.</li><li>A publisher thread drains the queue and publishes to Mosquitto using HiveMQ MQTT Client.</li><li>If the broker is down, buffer to a local file (store-and-forward) and replay on reconnect.</li><li>Expose <code>/health</code> and <code>/metrics</code> with Spring Boot.</li></ol>`},
resources:[{name:"Java Concurrency – dev.java",url:"https://dev.java/learn/concurrency/"},{name:"Eclipse Milo (GitHub)",url:"https://github.com/eclipse/milo"},{name:"HiveMQ MQTT Client",url:"https://github.com/hivemq/hivemq-mqtt-client"},{name:"Apache PLC4X",url:"https://plc4x.apache.org/"},{name:"Spring Boot guides",url:"https://spring.io/guides"},{name:"Eclipse Kura",url:"https://eclipse.dev/kura/"}],
quiz:[
{q:"Which Java 21 feature makes thousands of concurrent blocking device polls cheap?",options:["Records","Virtual threads","Annotations","Modules"],a:1,why:"Virtual threads are lightweight, JVM-managed threads."},
{q:"Eclipse Milo is a library for…",options:["Modbus","OPC UA","BACnet","Kafka"],a:1,why:"Milo is a Java OPC UA SDK."},
{q:"Store-and-forward in a gateway means…",options:["Deleting data when offline","Buffering data locally while disconnected and sending it later","Forwarding emails","Compressing logs"],a:1,why:"Prevents data loss during network outages."},
{q:"Apache PLC4X provides…",options:["A database","A unified API to many PLC protocols","A UI framework","A container runtime"],a:1,why:"PLC4X abstracts S7, Modbus, ADS, EtherNet/IP…"},
{q:"Which structure suits a producer/consumer buffer between threads?",options:["ArrayList","BlockingQueue","String","HashSet"],a:1,why:"BlockingQueue is thread-safe and supports blocking take/put."}
]},

{
id:"zos", phase:"Phase 3 · Mainframe", icon:"🖥", title:"Mainframe Fundamentals & z/OS", hours:20, level:"Beginner",
summary:"Many manufacturers, utilities and logistics firms still run ERP, orders, billing and supply-chain on IBM Z. IIoT data must flow into these systems. Learn z/OS concepts, datasets, TSO/ISPF and USS.",
objectives:["Explain the role of IBM Z in industry","Navigate TSO/ISPF and z/OS UNIX System Services","Understand datasets: PS, PDS/PDSE, VSAM, record formats","Describe JES, SDSF, RACF, CICS, IMS, Db2, MQ"],
lessons:[
{title:"Why mainframes in IIoT?",html:`<p>IBM Z handles ~70% of global transaction value. In industry it runs SAP back-ends, MRP, inventory, billing for utilities (smart-meter data!), and supply chain. IIoT integration patterns: shop-floor events → MQ/Kafka → CICS transactions or Db2 tables; batch jobs consolidating sensor data for reporting; z/OS Connect exposing REST APIs.</p>`},
{title:"z/OS architecture",html:`<ul><li><b>z/OS</b> – the flagship OS; address spaces, high availability, Parallel Sysplex clustering</li><li><b>TSO/E</b> – interactive time sharing; <b>ISPF</b> – menu-driven panels/editor</li><li><b>JES2/JES3</b> – Job Entry Subsystem for batch jobs; view output in <b>SDSF</b></li><li><b>RACF</b> (or ACF2/Top Secret) – security</li><li><b>USS</b> – z/OS UNIX System Services, a POSIX environment (run Java, Python, Node.js, Git on z/OS)</li><li>Middleware: <b>CICS</b> (online transactions), <b>IMS</b>, <b>Db2 for z/OS</b>, <b>IBM MQ</b>, z/OS Connect</li></ul>`},
{title:"Datasets",html:`<p>Mainframe "files" are <b>datasets</b>, named in qualifiers: <code>USER01.IIOT.SENSOR.DATA</code> (max 44 chars, segments ≤ 8 chars).</p><table><tr><th>Type</th><th>Description</th></tr><tr><td>PS (sequential)</td><td>Flat file of records</td></tr><tr><td>PDS / PDSE</td><td>Library with members, e.g. <code>USER01.JCL(COMPILE)</code></td></tr><tr><td>VSAM (KSDS, ESDS, RRDS)</td><td>Indexed/keyed access, used by CICS apps</td></tr><tr><td>GDG</td><td>Generation Data Groups – versioned datasets (daily sensor extracts)</td></tr></table><p>Record format: <code>RECFM=FB</code> (fixed blocked), <code>VB</code> (variable), <code>LRECL</code> record length, <code>BLKSIZE</code>. Data is in <b>EBCDIC</b>, not ASCII – conversion is a classic integration pitfall! Packed decimal (COMP-3) numbers also need decoding.</p>`},
{title:"Modern tooling",html:`<p>Zowe (open-source, Open Mainframe Project) gives a CLI and VS Code extension to edit datasets, submit jobs and view output from your PC: <code>zowe zos-files list ds "USER01.*"</code>, <code>zowe jobs submit ds "USER01.JCL(HELLO)"</code>. IBM Z Xplore offers free hands-on access to a real mainframe.</p>`}
],
lab:{title:"Lab: IBM Z Xplore",html:`<ol><li>Register for free at IBM Z Xplore.</li><li>Complete the Fundamentals challenges: VS Code + Zowe Explorer setup, datasets, USS.</li><li>Allocate a PDS <code>&lt;userid&gt;.IIOT.JCL</code> and a sequential dataset FB/80.</li><li>Upload a CSV of simulated sensor readings and view it in ISPF and via Zowe.</li></ol>`},
resources:[{name:"IBM Z Xplore – free mainframe access & learning",url:"https://www.ibm.com/z/resources/zxplore"},{name:"Introduction to the New Mainframe: z/OS Basics (IBM Redbook, free)",url:"https://www.redbooks.ibm.com/abstracts/sg246366.html"},{name:"Zowe – Open Mainframe Project",url:"https://www.zowe.org/"},{name:"Open Mainframe Project – COBOL/mainframe courses",url:"https://openmainframeproject.org/"},{name:"IBM z/OS documentation",url:"https://www.ibm.com/docs/en/zos"}],
quiz:[
{q:"Which subsystem processes batch jobs on z/OS?",options:["CICS","JES2","RACF","USS"],a:1,why:"JES2/JES3 handle job entry, scheduling and output."},
{q:"A PDS member is referenced as…",options:["USER01/JCL/COMPILE","USER01.JCL(COMPILE)","USER01:JCL:COMPILE","COMPILE@USER01.JCL"],a:1,why:"Library(member) notation."},
{q:"Mainframe text data is usually encoded in…",options:["UTF-16","EBCDIC","ASCII","Base64"],a:1,why:"EBCDIC – requires conversion when integrating."},
{q:"Which component handles online transaction processing?",options:["CICS","SDSF","ISPF","GDG"],a:0,why:"CICS = Customer Information Control System, OLTP."},
{q:"Zowe is…",options:["A mainframe hardware model","An open-source framework/CLI to interact with z/OS from modern tools","A PL/I compiler","A database"],a:1,why:"Zowe brings modern DevOps tooling to z/OS."}
]},

{
id:"jcl", phase:"Phase 3 · Mainframe", icon:"📜", title:"JCL – Job Control Language", hours:16, level:"Intermediate",
summary:"JCL tells z/OS what program to run, with which datasets and resources. Every batch process that ingests, sorts or reports industrial data on the mainframe is driven by JCL.",
objectives:["Write JOB, EXEC and DD statements","Allocate, sort and copy datasets with IBM utilities","Use COND/IF-THEN, PROCs, symbolic parameters and GDGs","Read job output and diagnose abends"],
lessons:[
{title:"Anatomy of a job",html:`<pre>//IIOTJOB  JOB (ACCT),'SENSOR LOAD',CLASS=A,MSGCLASS=X,NOTIFY=&amp;SYSUID
//*  Copy daily sensor extract to a new GDG generation
//STEP01   EXEC PGM=IEBGENER
//SYSPRINT DD SYSOUT=*
//SYSIN    DD DUMMY
//SYSUT1   DD DSN=PLANT.SENSOR.RAW,DISP=SHR
//SYSUT2   DD DSN=PLANT.SENSOR.DAILY(+1),
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(10,5),RLSE),
//            DCB=(RECFM=FB,LRECL=80,BLKSIZE=0)</pre><ul><li><b>JOB</b> – job identity, accounting, class, message class</li><li><b>EXEC</b> – program (<code>PGM=</code>) or procedure to run</li><li><b>DD</b> – Data Definition: binds a DD name used in the program to a dataset</li><li><b>DISP=(status,normal-end,abnormal-end)</b>: NEW/OLD/SHR/MOD; CATLG/KEEP/DELETE/PASS</li></ul>`},
{title:"Utilities",html:`<table><tr><th>Utility</th><th>Use</th></tr><tr><td>IEFBR14</td><td>"Do nothing" – used to allocate/delete datasets via DD</td></tr><tr><td>IEBGENER</td><td>Copy sequential datasets</td></tr><tr><td>IEBCOPY</td><td>Copy/compress PDS</td></tr><tr><td>DFSORT / SORT</td><td>Sort, merge, filter, reformat records</td></tr><tr><td>IDCAMS</td><td>Define/manage VSAM and GDG bases, REPRO copies</td></tr><tr><td>IKJEFT01</td><td>Run TSO commands/REXX, Db2 programs in batch</td></tr></table>
<pre>//SORTSTEP EXEC PGM=SORT
//SORTIN   DD DSN=PLANT.SENSOR.RAW,DISP=SHR
//SORTOUT  DD DSN=PLANT.SENSOR.ALARMS,DISP=(NEW,CATLG),SPACE=(TRK,(5,5))
//SYSOUT   DD SYSOUT=*
//SYSIN    DD *
  SORT FIELDS=(1,8,CH,A,9,14,CH,A)
  INCLUDE COND=(30,6,ZD,GT,+000700)
/*</pre><p>This sorts by sensor id and timestamp and keeps only readings above 70.0.</p>`},
{title:"Control flow, PROCs, symbols",html:`<pre>//CHECK    IF (STEP01.RC = 0) THEN
//REPORT   EXEC PGM=SENSRPT
//         ENDIF
//STEP3    EXEC PGM=CLEANUP,COND=(4,LT)</pre><p><code>COND=(4,LT)</code> means "skip this step if 4 is less than any previous return code". Cataloged/in-stream <b>PROCs</b> with symbolic parameters (<code>&amp;PLANT</code>) make reusable job templates. <code>JCLLIB ORDER=</code> points to PROC libraries; <code>INCLUDE</code> pulls in JCL fragments.</p>`},
{title:"Debugging",html:`<p>Read the JES log in SDSF/Zowe: JESMSGLG, JESJCL, JESYSMSG. Common abends: <b>S0C7</b> (data exception – bad packed decimal, very common with sensor data!), <b>S0C4</b> (protection), <b>S322</b> (CPU time exceeded), <b>SB37/SD37/SE37</b> (out of space), <b>JCL ERROR</b> (syntax), <b>S806</b> (program not found). Job schedulers (IBM Workload Scheduler, Control-M) orchestrate thousands of jobs nightly.</p>`}
],
lab:{title:"Lab: Sensor batch pipeline",html:`<ol><li>On Z Xplore, create a GDG base with IDCAMS (<code>DEFINE GDG (NAME(&lt;id&gt;.SENSOR.DAILY) LIMIT(7) SCRATCH)</code>).</li><li>Upload a fixed-width file: sensorId(8) timestamp(14) blank(7) value(6, zoned decimal ×10).</li><li>Write a job: STEP1 SORT + INCLUDE to filter alarm values, STEP2 IEBGENER to the new GDG generation, STEP3 runs only if RC=0.</li><li>Intentionally cause a S0C7 or JCL error, then diagnose it from the job log.</li></ol>`},
resources:[{name:"IBM z/OS MVS JCL Reference",url:"https://www.ibm.com/docs/en/zos/latest?topic=mvs-zos-jcl-reference"},{name:"IBM z/OS MVS JCL User's Guide",url:"https://www.ibm.com/docs/en/zos/latest?topic=mvs-zos-jcl-users-guide"},{name:"DFSORT Getting Started",url:"https://www.ibm.com/docs/en/zos/latest?topic=dfsort-getting-started"},{name:"IBM Z Xplore JCL challenges",url:"https://www.ibm.com/z/resources/zxplore"},{name:"Tutorialspoint JCL tutorial",url:"https://www.tutorialspoint.com/jcl/index.htm"}],
quiz:[
{q:"Which JCL statement binds a program's file name to a dataset?",options:["JOB","EXEC","DD","PROC"],a:2,why:"DD = Data Definition."},
{q:"DISP=(NEW,CATLG,DELETE) means…",options:["Delete the dataset always","Create; catalog on success; delete on abend","Share an existing dataset","Append to dataset"],a:1,why:"Status, normal disposition, abnormal disposition."},
{q:"Abend S0C7 usually indicates…",options:["Out of space","Invalid numeric (packed decimal) data","Program not found","Security violation"],a:1,why:"Data exception – frequent with bad numeric fields."},
{q:"Which utility defines VSAM clusters and GDG bases?",options:["IEBGENER","IDCAMS","IEFBR14","SORT"],a:1,why:"IDCAMS = Access Method Services."},
{q:"(+1) in a GDG dataset reference means…",options:["The current generation","The next new generation","The previous generation","All generations"],a:1,why:"(0) is current, (+1) new, (-1) previous."}
]},

{
id:"pli", phase:"Phase 3 · Mainframe", icon:"🧮", title:"PL/I Programming", hours:20, level:"Intermediate",
summary:"PL/I is a powerful mainframe language combining scientific and business capabilities, still used in manufacturing, automotive, banking and utilities. Learn to read, write and maintain PL/I batch programs.",
objectives:["Understand PL/I program structure and data types","Process records with file I/O (RECORD and STREAM)","Use structures, arrays, BUILTIN functions and ON-conditions","Compile/link/run PL/I with JCL and call Db2/CICS"],
lessons:[
{title:"Program structure & data",html:`<pre> SENSAVG: PROCEDURE OPTIONS(MAIN);
   DCL SUM      FIXED DECIMAL(11,2) INIT(0);
   DCL COUNT    FIXED BINARY(31)    INIT(0);
   DCL AVG      FIXED DECIMAL(9,2);
   DCL EOF      BIT(1)              INIT('0'B);

   DCL 1 READING,
         3 SENSOR_ID  CHAR(8),
         3 TSTAMP     CHAR(14),
         3 FILLER     CHAR(7),
         3 VALUE      PIC'9999V99',
         3 REST       CHAR(45);

   DCL SENSIN FILE RECORD INPUT;
   ON ENDFILE(SENSIN) EOF = '1'B;

   OPEN FILE(SENSIN);
   READ FILE(SENSIN) INTO(READING);
   DO WHILE(^EOF);
      SUM   = SUM + VALUE;
      COUNT = COUNT + 1;
      READ FILE(SENSIN) INTO(READING);
   END;
   IF COUNT > 0 THEN AVG = SUM / COUNT;
   PUT SKIP LIST('READINGS:', COUNT, ' AVERAGE:', AVG);
   CLOSE FILE(SENSIN);
 END SENSAVG;</pre><p>Data types: <code>FIXED DECIMAL</code> (packed, exact – business math), <code>FIXED BINARY</code>, <code>FLOAT</code>, <code>CHAR</code>, <code>VARYING</code> strings, <code>BIT</code>, <code>PICTURE</code> (zoned), <code>POINTER</code>, <code>BASED</code> variables. Level-numbered <b>structures</b> map exactly onto mainframe record layouts.</p>`},
{title:"Control flow & procedures",html:`<p><code>IF/THEN/ELSE</code>, <code>SELECT/WHEN/OTHERWISE</code>, <code>DO</code> loops (iterative, WHILE, UNTIL), <code>LEAVE/ITERATE</code>. Internal and external procedures, <code>CALL</code>, functions with <code>RETURNS</code>, parameter passing by reference. Arrays: <code>DCL TEMPS(24) FLOAT;</code></p>`},
{title:"Built-ins and conditions",html:`<p>Built-in functions: <code>SUBSTR, INDEX, LENGTH, TRIM, VERIFY, TRANSLATE, MAX, MIN, ROUND, DATETIME, HEX</code>. <b>ON-units</b> handle conditions: <code>ENDFILE, CONVERSION, ZERODIVIDE, FIXEDOVERFLOW, ERROR</code> – critical for robust processing of dirty sensor data.</p><pre> ON CONVERSION BEGIN;
    PUT SKIP LIST('BAD VALUE IN RECORD FOR', SENSOR_ID);
    ONSOURCE = '0';   /* replace bad chars and retry */
 END;</pre>`},
{title:"Compile & run with JCL",html:`<pre>//PLIJOB   JOB ...
//COMPILE  EXEC IBMZCBG,PARM.PLI='OBJECT,OPTIONS'
//PLI.SYSIN DD DSN=&amp;SYSUID..IIOT.PLI(SENSAVG),DISP=SHR
//GO.SENSIN DD DSN=PLANT.SENSOR.DAILY(0),DISP=SHR
//GO.SYSPRINT DD SYSOUT=*</pre><p>IBM Enterprise PL/I provides cataloged procedures like <code>IBMZC</code> (compile), <code>IBMZCB</code> (compile+bind), <code>IBMZCBG</code> (compile+bind+go). Embedded SQL (<code>EXEC SQL ... END-EXEC;</code>) accesses Db2; <code>EXEC CICS</code> for online transactions.</p>`}
],
lab:{title:"Lab: Sensor statistics program",html:`<ol><li>Write a PL/I program reading the sensor file from the JCL lab.</li><li>Compute min/max/avg per sensor (input pre-sorted by sensor id – control-break logic).</li><li>Write a report dataset and set a return code (<code>CALL PLIRETC(4)</code>) if any alarm exists.</li><li>Chain it in your JCL after the SORT step with conditional execution.</li></ol>`},
resources:[{name:"IBM Enterprise PL/I for z/OS documentation",url:"https://www.ibm.com/docs/en/epfz"},{name:"Enterprise PL/I Language Reference",url:"https://www.ibm.com/docs/en/epfz/6.1?topic=reference-language"},{name:"PL/I on Wikipedia (history & syntax overview)",url:"https://en.wikipedia.org/wiki/PL/I"},{name:"Iron Spring PL/I (free PL/I compiler for Linux)",url:"http://www.iron-spring.com/"},{name:"IBM Z Xplore (practice environment)",url:"https://www.ibm.com/z/resources/zxplore"}],
quiz:[
{q:"Which PL/I type gives exact decimal arithmetic (packed)?",options:["FLOAT","FIXED DECIMAL","BIT","POINTER"],a:1,why:"FIXED DECIMAL is stored as packed decimal."},
{q:"How does PL/I detect end of an input file?",options:["ON ENDFILE condition","EOF() function only","Exception class","GOTO 999"],a:0,why:"ON ENDFILE(file) sets a flag or performs an action."},
{q:"The entry procedure of a PL/I program is declared with…",options:["OPTIONS(MAIN)","public static void main","PROGRAM-ID","START:"],a:0,why:"PROCEDURE OPTIONS(MAIN)."},
{q:"Which condition fires on invalid character-to-numeric conversion?",options:["ZERODIVIDE","CONVERSION","ENDPAGE","SIZE"],a:1,why:"CONVERSION condition, with ONSOURCE available."},
{q:"IBMZCBG is a cataloged procedure that…",options:["Only compiles","Compiles, binds and executes","Deletes datasets","Starts CICS"],a:1,why:"C=compile, B=bind, G=go."}
]},

{
id:"mfint", phase:"Phase 3 · Mainframe", icon:"🔗", title:"Mainframe Integration: CICS, Db2, MQ & z/OS Connect", hours:14, level:"Advanced",
summary:"Bridge the shop floor to the mainframe: event-driven integration with IBM MQ and Kafka, REST APIs via z/OS Connect, Db2 access and Java on z/OS.",
objectives:["Design integration patterns between IIoT platforms and z/OS","Use IBM MQ queues & topics and the MQ–MQTT bridge","Expose CICS/Db2 assets as REST APIs","Handle EBCDIC/packed-decimal conversion in Java"],
lessons:[
{title:"Integration patterns",html:`<ul><li><b>Messaging</b>: IBM MQ (queues, pub/sub) – guaranteed once-only delivery; MQ has an MQTT service (MQXR) and Kafka Connect connectors</li><li><b>APIs</b>: z/OS Connect maps REST/JSON to CICS, IMS, Db2 programs (OpenAPI 3)</li><li><b>Data</b>: Db2 for z/OS via JDBC; CDC (change data capture) to Kafka</li><li><b>Batch file transfer</b>: Connect:Direct, SFTP, triggered JCL</li><li><b>Java on z/OS</b>: run Java (JZOS toolkit) directly in batch or in Liberty</li></ul><p>Example: a machine finishes a production order → edge publishes Sparkplug event → Kafka → MQ → CICS transaction updates inventory & ERP in real time.</p>`},
{title:"IBM MQ fundamentals",html:`<p>Queue manager, local/remote/alias queues, channels, dead-letter queue, persistent messages, syncpoint (units of work). Java JMS example:</p><pre>JmsConnectionFactory cf = JmsFactoryFactory.getInstance(WMQConstants.WMQ_PROVIDER).createConnectionFactory();
cf.setStringProperty(WMQConstants.WMQ_HOST_NAME, "mq.plant.local");
cf.setIntProperty(WMQConstants.WMQ_PORT, 1414);
cf.setStringProperty(WMQConstants.WMQ_QUEUE_MANAGER, "QM1");
try (JMSContext ctx = cf.createContext()) {
    ctx.createProducer().send(ctx.createQueue("queue:///PROD.ORDERS.DONE"), json);
}</pre>`},
{title:"Data conversion",html:`<pre>String s = new String(bytes, Charset.forName("IBM1047"));   // EBCDIC -&gt; Java
// packed decimal 0x12345C = +12345
static long unpack(byte[] b){ long v=0; for(int i=0;i&lt;b.length;i++){int hi=(b[i]&gt;&gt;4)&amp;0xF, lo=b[i]&amp;0xF;
  v=v*10+hi; if(i&lt;b.length-1) v=v*10+lo; else if(lo==0xD) v=-v;} return v; }</pre><p>Copybooks (COBOL/PL/I record layouts) are the "schema" – tools like JRecord or IBM Record Generator create Java classes from them.</p>`}
],
lab:{title:"Lab: MQ bridge",html:`<ol><li>Run IBM MQ developer edition in Docker: <code>docker run -e LICENSE=accept -e MQ_QMGR_NAME=QM1 -p 1414:1414 -p 9443:9443 icr.io/ibm-messaging/mq</code></li><li>Write a Java app that subscribes to MQTT <code>plant/+/orders/done</code> and forwards each as a persistent MQ message.</li><li>Add a fixed-width EBCDIC encoder producing a record matching your PL/I layout.</li><li>(Optional, Z Xplore) Process the records in your PL/I batch job.</li></ol>`},
resources:[{name:"IBM MQ Developer Essentials (free badge)",url:"https://developer.ibm.com/learningpaths/ibm-mq-badge/"},{name:"IBM MQ container (GitHub)",url:"https://github.com/ibm-messaging/mq-container"},{name:"z/OS Connect documentation",url:"https://www.ibm.com/docs/en/zos-connect"},{name:"JRecord – copybook parsing in Java",url:"https://github.com/bmTas/JRecord"},{name:"Kafka Connect MQ connectors",url:"https://github.com/ibm-messaging/kafka-connect-mq-source"}],
quiz:[
{q:"Which product exposes CICS programs as REST APIs?",options:["z/OS Connect","SDSF","DFSORT","RACF"],a:0,why:"z/OS Connect maps REST/JSON to z/OS assets."},
{q:"The packed-decimal bytes 0x12 0x34 0x5D represent…",options:["+12345","-12345","12345D","-1234"],a:1,why:"Last nibble D = negative sign."},
{q:"Default IBM MQ listener port is…",options:["1414","1883","502","9092"],a:0,why:"MQ listens on 1414 by default."},
{q:"A COBOL/PL/I copybook serves as…",options:["A compiled binary","The record layout/schema","A JCL procedure","A security profile"],a:1,why:"It defines field positions and types."},
{q:"Which Java charset handles EBCDIC Latin-1?",options:["UTF-8","IBM1047","ISO-8859-1","US-ASCII"],a:1,why:"IBM1047 (or Cp037) are EBCDIC code pages."}
]},

{
id:"ot", phase:"Phase 4 · Operational Technology", icon:"🏭", title:"OT Foundations: PLCs, SCADA & Control", hours:20, level:"Intermediate",
summary:"Understand the machines and control systems you are connecting: PLCs, IEC 61131-3 programming, HMI/SCADA, DCS, historians, control loops and safety systems.",
objectives:["Explain PLC scan cycle and I/O","Read ladder logic and Structured Text","Describe SCADA, HMI, DCS, historian and MES roles","Understand PID control, alarms (ISA-18.2) and SIS"],
lessons:[
{title:"PLCs",html:`<p>A <b>Programmable Logic Controller</b> runs a deterministic <b>scan cycle</b>: read inputs → execute program → write outputs → housekeeping/comms (typ. 1–50 ms). Vendors: Siemens (S7-1200/1500, TIA Portal), Rockwell (ControlLogix, Studio 5000), Schneider, Beckhoff (TwinCAT), Omron, Mitsubishi, CODESYS-based controllers.</p><p>IEC 61131-3 languages: Ladder Diagram (LD), Function Block Diagram (FBD), <b>Structured Text (ST)</b>, Sequential Function Chart (SFC), Instruction List (deprecated). IEC 61499 adds distributed, event-driven function blocks (Eclipse 4diac).</p><pre>(* Structured Text: tank level control *)
IF Level &gt; 90.0 THEN
    InletValve := FALSE; HighAlarm := TRUE;
ELSIF Level &lt; 20.0 THEN
    InletValve := TRUE;
END_IF;
PumpTimer(IN := PumpRun, PT := T#10S);</pre>`},
{title:"SCADA, HMI, DCS, Historian",html:`<ul><li><b>HMI</b> – operator screen at a machine</li><li><b>SCADA</b> – Supervisory Control And Data Acquisition across many sites (Ignition, WinCC, AVEVA, FactoryTalk)</li><li><b>DCS</b> – Distributed Control System for continuous process plants (Emerson DeltaV, Honeywell Experion, ABB 800xA)</li><li><b>Historian</b> – time-series storage (AVEVA PI, Canary, Ignition Historian)</li><li><b>MES</b> – production orders, quality, genealogy</li></ul>`},
{title:"Control theory & alarms",html:`<p><b>PID</b> controller: output = Kp·e + Ki·∫e dt + Kd·de/dt. Open vs closed loop, setpoint (SP), process variable (PV), control variable (CV). <b>Alarm management</b> per ISA-18.2/EEMUA 191 – avoid alarm floods (&gt;10 alarms/10 min per operator). <b>Safety Instrumented Systems</b> (IEC 61511, SIL levels) are separate and never controlled from IIoT apps – IIoT is typically <i>read-mostly</i>.</p>`},
{title:"Data modelling in OT",html:`<p>Tags (e.g., <code>Line2.Filler.Motor1.Speed</code>), data types, engineering units, quality codes (Good/Bad/Uncertain), timestamps (source vs server). Standards: <b>ISA-88</b> (batch), <b>PackML/ISA-TR88.00.02</b> (machine states: Idle, Execute, Held, Aborted…), asset hierarchy Enterprise/Site/Area/Line/Cell per ISA-95.</p>`}
],
lab:{title:"Lab: Program a soft PLC",html:`<ol><li>Install CODESYS Development System (free) or OpenPLC Runtime + Editor.</li><li>Write an ST program for a conveyor with start/stop, a motor run-time counter, and a PackML-like state machine.</li><li>Enable the built-in Modbus TCP server / OPC UA server and expose the variables.</li><li>Read them with a generic client (next modules). Bonus: install Ignition Maker Edition (free) and build an HMI.</li></ol>`},
resources:[{name:"OpenPLC Project (open source)",url:"https://autonomylogic.com/"},{name:"CODESYS (free IDE)",url:"https://www.codesys.com/"},{name:"PLCopen – IEC 61131-3",url:"https://plcopen.org/"},{name:"Inductive University – free Ignition SCADA courses",url:"https://inductiveuniversity.com/"},{name:"Eclipse 4diac (IEC 61499)",url:"https://eclipse.dev/4diac/"},{name:"PLCAcademy free tutorials",url:"https://www.plcacademy.com/"}],
quiz:[
{q:"The correct PLC scan cycle order is…",options:["Execute → read inputs → write outputs","Read inputs → execute program → write outputs","Write outputs → read inputs → execute","Random"],a:1,why:"Inputs are snapshotted, logic executes, outputs updated."},
{q:"Which IEC 61131-3 language is text-based and Pascal-like?",options:["Ladder Diagram","Structured Text","FBD","SFC"],a:1,why:"ST resembles Pascal."},
{q:"A plant-wide system for continuous processes like refineries is typically a…",options:["DCS","HMI panel","Smart phone","CDN"],a:0,why:"Distributed Control Systems run continuous process plants."},
{q:"In PID, the term reacting to accumulated past error is…",options:["Proportional","Integral","Derivative","Feed-forward"],a:1,why:"The integral term eliminates steady-state error."},
{q:"Which standard defines alarm management?",options:["ISA-18.2","ISA-95","IEEE 802.3","ISO 27001"],a:0,why:"ANSI/ISA-18.2."}
]},

{
id:"protocols", phase:"Phase 4 · Operational Technology", icon:"📡", title:"Industrial Protocols & Sensor Simulation", hours:22, level:"Intermediate",
summary:"Speak the languages of the shop floor – Modbus, PROFINET, EtherNet/IP, S7, BACnet, DNP3, IEC 61850, IO-Link – and build realistic sensor simulations to develop without real hardware.",
objectives:["Read/write Modbus registers and decode data types","Compare major fieldbus/industrial Ethernet protocols","Simulate devices and realistic sensor signals","Use Python/Java libraries to talk to devices"],
lessons:[
{title:"Modbus in depth",html:`<p>Master/slave (client/server) protocol from 1979. Variants: RTU (binary, RS-485, CRC), ASCII, TCP (port 502, MBAP header).</p><table><tr><th>Table</th><th>Address</th><th>Access</th><th>Function codes</th></tr><tr><td>Coils</td><td>0xxxx</td><td>R/W bit</td><td>01, 05, 15</td></tr><tr><td>Discrete inputs</td><td>1xxxx</td><td>R bit</td><td>02</td></tr><tr><td>Input registers</td><td>3xxxx</td><td>R 16-bit</td><td>04</td></tr><tr><td>Holding registers</td><td>4xxxx</td><td>R/W 16-bit</td><td>03, 06, 16</td></tr></table><p>Pitfalls: 0- vs 1-based addressing, 32-bit floats across two registers with varying <b>word/byte order</b> (ABCD, CDAB, BADC, DCBA), scaling factors, no security, no semantics.</p><pre># Python – pymodbus 3.x
from pymodbus.client import ModbusTcpClient
c = ModbusTcpClient("127.0.0.1", port=5020); c.connect()
rr = c.read_holding_registers(0, count=2, slave=1)
val = c.convert_from_registers(rr.registers, data_type=c.DATATYPE.FLOAT32)</pre>`},
{title:"Industrial Ethernet & fieldbuses",html:`<table><tr><th>Protocol</th><th>Ecosystem</th><th>Notes</th></tr><tr><td>PROFIBUS / PROFINET</td><td>Siemens, PI</td><td>PROFINET RT/IRT, GSDML device files</td></tr><tr><td>EtherNet/IP (CIP)</td><td>Rockwell, ODVA</td><td>Tags via CIP, port 44818/2222</td></tr><tr><td>S7comm / S7comm-plus</td><td>Siemens PLCs</td><td>Port 102, used by Snap7/PLC4X</td></tr><tr><td>EtherCAT</td><td>Beckhoff, ETG</td><td>Ultra-fast motion control</td></tr><tr><td>CANopen / CAN bus / J1939</td><td>Machines, vehicles</td><td></td></tr><tr><td>BACnet, KNX, LonWorks</td><td>Building automation</td><td>BACnet/IP port 47808</td></tr><tr><td>DNP3, IEC 60870-5-104, IEC 61850</td><td>Utilities/energy</td><td>Substations, SCADA telemetry</td></tr><tr><td>HART, IO-Link</td><td>Field instruments, sensors</td><td>Digital device parameters</td></tr><tr><td>ADS (Beckhoff), FINS (Omron), MC (Mitsubishi)</td><td>Vendor</td><td></td></tr></table><p>Protocol converters/gateways (HMS Anybus, Moxa, Kepware KEPServerEX, Softing) translate these into OPC UA or MQTT.</p>`},
{title:"Sensor simulation",html:`<p>Realistic simulation lets you build and test pipelines without hardware:</p><ul><li><b>Signal models</b>: baseline + sine (daily cycles) + Gaussian noise + random walk drift + spikes/outliers + stuck values + dropouts</li><li><b>Physics-based</b>: tank fill/drain, motor temperature rising with load, bearing vibration with growing fault frequencies (for predictive maintenance datasets)</li><li><b>State machines</b>: machine states with production counts and fault codes</li></ul><pre>import math, random, time
t, drift = 0, 0
while True:
    drift += random.gauss(0, 0.02)
    temp = 60 + 5*math.sin(2*math.pi*t/3600) + drift + random.gauss(0, 0.3)
    if random.random() &lt; 0.001: temp += 25      # spike
    t += 1; time.sleep(1)</pre><p>Tools: pymodbus simulator, ModbusPal, diagslave, Prosys OPC UA Simulation Server, Microsoft OPC PLC (container), Node-RED, Factory I/O (3D), CODESYS soft PLC, Sparkplug simulators, Kaggle/NASA bearing datasets for real data.</p>`}
],
lab:{title:"Lab: Simulated Modbus plant",html:`<ol><li>Run a Modbus server simulator (<code>pip install pymodbus</code> → write a server that updates holding registers from your signal models).</li><li>Encode temperature as FLOAT32 (registers 0–1), pressure scaled ×100 as INT16 (register 2), and a machine state (register 3).</li><li>Write a Java poller with j2mod or PLC4X that decodes all values and handles word order.</li><li>Inspect the traffic in Wireshark (filter <code>mbtcp</code>).</li><li>Bonus: run <code>mcr.microsoft.com/iotedge/opc-plc</code> for the next module.</li></ol>`},
resources:[{name:"Modbus Organization – specifications (free)",url:"https://modbus.org/specs.php"},{name:"PyModbus docs",url:"https://pymodbus.readthedocs.io/"},{name:"j2mod (Java Modbus)",url:"https://github.com/steveohara/j2mod"},{name:"PROFIBUS & PROFINET International",url:"https://www.profibus.com/"},{name:"ODVA – EtherNet/IP",url:"https://www.odva.org/"},{name:"Snap7 (S7 communication)",url:"https://snap7.sourceforge.net/"},{name:"Microsoft OPC PLC simulator",url:"https://github.com/Azure-Samples/iot-edge-opc-plc"},{name:"NASA Prognostics data repository",url:"https://www.nasa.gov/intelligent-systems-division/discovery-and-systems-health/pcoe/pcoe-data-set-repository/"}],
quiz:[
{q:"Which Modbus function code reads holding registers?",options:["01","03","05","16"],a:1,why:"FC03 = Read Holding Registers."},
{q:"A 32-bit float in Modbus occupies…",options:["1 register","2 registers","4 registers","1 coil"],a:1,why:"Each register is 16 bits."},
{q:"Which protocol is native to Rockwell/Allen-Bradley PLCs?",options:["EtherNet/IP (CIP)","BACnet","DNP3","KNX"],a:0,why:"EtherNet/IP uses the Common Industrial Protocol."},
{q:"DNP3 and IEC 61850 are mostly used in…",options:["Building lighting","Electric utilities and substations","Consumer smart homes","Automotive infotainment"],a:1,why:"They're power-grid/utility protocols."},
{q:"A good sensor simulator should include…",options:["Only constant values","Noise, drift, spikes and dropouts","Only random integers","Only zeros"],a:1,why:"Realistic imperfections test your pipeline's robustness."}
]}
];

