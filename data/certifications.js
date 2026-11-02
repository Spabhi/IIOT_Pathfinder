/* Curated IIoT Certifications, Free Official Badges & Profile Fitness Criteria */
window.CERTIFICATIONS = [
  {
    id: "iic-foundations",
    title: "Industry 4.0 & ISA-95 Architecture Foundations (Self-Assessed Readiness / Digital Transformation Associate)",
    provider: "ISA / Udemy / Coursera Industry 4.0 Tracks",
    category: "Foundations & Architecture",
    tier: "Foundational",
    cost: "Free audit / ~$49–$99 cert",
    requiredModules: ["orientation"],
    minAvgScore: 80,
    examFormat: "Online assessment · 40–60 multiple-choice questions",
    prepHours: "6–10 hours",
    url: "https://www.isa.org/training-and-certification",
    domains: [
      "IT vs. OT priorities (Availability, Integrity, Confidentiality)",
      "Purdue Model (Levels 0–5) & ISA-95 functional hierarchy",
      "Overall Equipment Effectiveness (OEE) calculation & value drivers",
      "Unified Namespace (UNS) vs. traditional automation pyramid"
    ],
    whyItMatters: "Proves to hiring managers and system integrators that you speak the architectural language of manufacturing (ISA-95, Purdue, OEE) before touching code.",
    readinessTip: "Be able to draw the Purdue Model from memory and calculate OEE given availability, cycle times, and scrap counts."
  },
  {
    id: "cisco-net-linux",
    title: "Cisco Networking Basics & Linux Foundation Certified IT Associate (LFCA)",
    provider: "Cisco NetAcad (Free Badge) / Linux Foundation",
    category: "Foundations & Edge OS",
    tier: "Foundational",
    cost: "Cisco Badge: Free · LFCA Exam: $250",
    requiredModules: ["networking"],
    minAvgScore: 80,
    examFormat: "Cisco: Free online module exams · LFCA: 90-min online proctored multiple-choice",
    prepHours: "15–25 hours",
    url: "https://www.netacad.com/courses/networking-basics",
    domains: [
      "OSI & TCP/IP stack, IPv4 subnetting (CIDR), VLANs, industrial ports (502, 1883, 4840)",
      "Linux CLI, systemd services, permissions, SSH, and packet capture (tcpdump/Wireshark)",
      "Industrial physical layers: RS-232/RS-485 serial vs. Industrial Ethernet",
      "Sensor signal fundamentals: 4–20 mA current loops, 0–10 V, and ADC scaling"
    ],
    whyItMatters: "90% of IIoT field issues are networking, firewall, or Linux service problems. Passing Cisco NetAcad's free Networking Basics badge gives an immediate verifiable credential for LinkedIn.",
    readinessTip: "Practice subnetting (/24, /26) and diagnosing closed ports vs. routing failures using ip route, ss -tulpn, and tcpdump."
  },
  {
    id: "java-foundations-ocp",
    title: "Oracle Certified Foundations Associate, Java (1Z0-811)",
    provider: "Oracle University",
    category: "Programming",
    tier: "Associate",
    cost: "Exam: ~$95–$150",
    requiredModules: ["java1"],
    minAvgScore: 80,
    examFormat: "120 minutes · 60 multiple-choice questions · 65% passing score",
    prepHours: "30–40 hours",
    url: "https://education.oracle.com/java-foundations/pexam_1Z0-811",
    domains: [
      "Java data types, primitives, operators, bit/byte manipulation (ByteBuffer)",
      "Object-Oriented Programming: classes, interfaces, inheritance, records, enums",
      "Collections Framework (List, Map, Set), Generics, and Java Streams",
      "Exception handling (try-with-resources) and Maven/JUnit project structure"
    ],
    whyItMatters: "Ideal first programming credential for career switchers with no prior CS degree; validates core Java fluency used across Ignition, Eclipse Milo, Kura, and Kafka.",
    readinessTip: "Make sure you are comfortable tracing loop execution, stream pipelines, and checked vs. unchecked exceptions without an IDE."
  },
  {
    id: "ocp-java-se-21",
    title: "Oracle Certified Professional: Java SE 21 Developer (1Z0-830)",
    provider: "Oracle University",
    category: "Programming",
    tier: "Professional",
    cost: "Exam: ~$245",
    requiredModules: ["java1", "java2"],
    minAvgScore: 85,
    examFormat: "120 minutes · 50 scenario & code-analysis questions · 68% passing score",
    prepHours: "60–80 hours",
    url: "https://education.oracle.com/oracle-certified-professional-java-se-21-developer/trackp_OCPJVSE21",
    domains: [
      "Advanced OOP: sealed classes, records, pattern matching, functional interfaces",
      "Concurrency: platform vs. virtual threads, Executors, BlockingQueue, CompletableFuture",
      "Java I/O, NIO channels, serialization, and network sockets",
      "Modules, JDBC, localization, and stream collectors"
    ],
    whyItMatters: "The gold-standard Java credential. Combined with Eclipse Milo and Paho MQTT projects, it qualifies you for Senior Java IIoT / Edge Backend roles.",
    readinessTip: "Requires deep mastery of both Java modules (85%+ average recommended). Pay special attention to virtual thread pinning, race conditions, and stream reduction."
  },
  {
    id: "ibm-zxplore-fundamentals",
    title: "IBM Z Xplore – Fundamentals Official Badge",
    provider: "IBM (Credly Verifiable Badge)",
    category: "Mainframe",
    tier: "Foundational",
    cost: "100% Free",
    requiredModules: ["zos"],
    minAvgScore: 80,
    examFormat: "Hands-on challenges on a live IBM Z mainframe via VS Code & Zowe",
    prepHours: "8–12 hours",
    url: "https://www.ibm.com/z/resources/zxplore",
    domains: [
      "z/OS architecture, TSO/ISPF, JES2 job spool (SDSF), and UNIX System Services (USS)",
      "Datasets: Sequential (PS), Partitioned (PDS/PDSE), VSAM, and EBCDIC encoding",
      "Modern mainframe navigation with VS Code and Zowe Explorer"
    ],
    whyItMatters: "Your first official IBM-issued Credly badge—proves you can navigate z/OS datasets and USS on a live mainframe.",
    readinessTip: "Complete the Fundamentals tier on IBM Z Xplore using VS Code and Zowe Explorer."
  },
  {
    id: "ibm-zxplore-badges",
    title: "IBM Z Xplore – Concepts & JCL Batch Specialist Badge",
    provider: "IBM (Credly Verifiable Badges)",
    category: "Mainframe",
    tier: "Associate",
    cost: "100% Free",
    requiredModules: ["zos", "jcl"],
    minAvgScore: 80,
    examFormat: "Hands-on JCL & dataset challenges on a live IBM Z mainframe",
    prepHours: "20–30 hours",
    url: "https://www.ibm.com/z/resources/zxplore",
    domains: [
      "JCL syntax: JOB, EXEC, DD statements, DISP parameters, and symbolic procedures",
      "IBM utilities: IEFBR14, IEBGENER, IEBCOPY, DFSORT, and IDCAMS (VSAM/GDG)",
      "Diagnosing batch abends (S0C7, S806, SB37) and conditional job execution"
    ],
    whyItMatters: "Issued directly by IBM on Credly at zero cost. Proves you can automate and debug batch data pipelines on z/OS.",
    readinessTip: "Practice writing multi-step JCL jobs with DFSORT and Generation Data Groups (GDGs)."
  },
  {
    id: "ibm-pli-specialist",
    title: "Enterprise PL/I Programming & Batch Data Processing Credential",
    provider: "IBM Z Xplore Advanced / Open Mainframe Project",
    category: "Mainframe",
    tier: "Specialist",
    cost: "100% Free",
    requiredModules: ["zos", "jcl", "pli"],
    minAvgScore: 82,
    examFormat: "Hands-on PL/I coding, compilation (IBMZCBG) & batch dataset processing",
    prepHours: "40–50 hours",
    url: "https://www.ibm.com/docs/en/epfz",
    domains: [
      "PL/I program structure (OPTIONS(MAIN)), FIXED DECIMAL (COMP-3), and level-numbered structures",
      "Record & Stream I/O over sequential and VSAM datasets",
      "Built-in functions and ON-condition error recovery (ON ENDFILE, ON CONVERSION)",
      "Compiling, binding, and executing PL/I programs via JCL cataloged procedures"
    ],
    whyItMatters: "PL/I expertise is scarce and highly sought after in automotive, manufacturing, logistics, and utilities running legacy core systems.",
    readinessTip: "Ensure you can map an 80-byte fixed record layout to a PL/I level-1 structure and recover cleanly from bad numeric data using ON CONVERSION."
  },
  {
    id: "ibm-mainframe-practitioner",
    title: "IBM z/OS Mainframe Practitioner & Enterprise PL/I Integration Specialist",
    provider: "IBM / Coursera & Open Mainframe Project",
    category: "Mainframe",
    tier: "Professional",
    cost: "Free audit / ~$49 Coursera cert + Free IBM Credly Badge",
    requiredModules: ["zos", "jcl", "pli", "mfint"],
    minAvgScore: 85,
    examFormat: "Multi-course assessments & hands-on mainframe labs",
    prepHours: "60–70 hours",
    url: "https://www.coursera.org/professional-certificates/ibm-z-mainframe",
    domains: [
      "End-to-end z/OS operations, security (RACF), and workload scheduling",
      "Batch data processing with JCL, DFSORT, VSAM, and Generation Data Groups",
      "PL/I programming: FIXED DECIMAL (COMP-3), structures, RECORD I/O, and ON-conditions",
      "Hybrid integration: IBM MQ queues/bridges, CICS transactions, Db2, and z/OS Connect REST APIs"
    ],
    whyItMatters: "Very few engineers understand both modern IIoT (MQTT/Kafka) and legacy enterprise backbones (PL/I, JCL, MQ, CICS). This rare combination commands a high premium in automotive, energy, and logistics.",
    readinessTip: "Ensure you can explain how a shop-floor MQTT message crosses into IBM MQ, converts from UTF-8 JSON to EBCDIC/COMP-3 copybook format, and triggers a CICS or PL/I batch update."
  },
  {
    id: "ibm-mq-developer",
    title: "IBM MQ Developer Essentials Badge",
    provider: "IBM Developer (Credly Badge)",
    category: "Mainframe & Messaging",
    tier: "Associate",
    cost: "100% Free",
    requiredModules: ["java2", "mfint"],
    minAvgScore: 80,
    examFormat: "Online quiz after guided Docker + JMS hands-on tutorials",
    prepHours: "10–15 hours",
    url: "https://developer.ibm.com/learningpaths/ibm-mq-badge/",
    domains: [
      "Queue Managers, local/remote queues, channels, and dead-letter handling",
      "Point-to-point vs. pub/sub messaging and transactional syncpoints",
      "Java JMS 2.0 client programming with IBM MQ",
      "Bridging telemetry between MQTT/Kafka and enterprise MQ queues"
    ],
    whyItMatters: "A fast, free official IBM badge that validates your ability to write Java code connecting distributed systems to enterprise message queues.",
    readinessTip: "Run the IBM MQ developer container locally and practice sending/receiving persistent JMS messages from Java."
  },
  {
    id: "plc-scada-foundations",
    title: "IEC 61131-3 PLC Programming & SCADA Foundations Certificate",
    provider: "Inductive University (Free) / CODESYS Academy",
    category: "Operational Technology & SCADA",
    tier: "Foundational",
    cost: "100% Free (Inductive University Credential)",
    requiredModules: ["ot"],
    minAvgScore: 80,
    examFormat: "Online module challenges covering PLC logic, scan cycles, tags & HMI/SCADA basics",
    prepHours: "15–20 hours",
    url: "https://inductiveuniversity.com/",
    domains: [
      "Deterministic PLC scan cycle (Read Inputs → Execute Program → Write Outputs)",
      "IEC 61131-3 languages: Ladder Diagram (LD) and Structured Text (ST)",
      "PID closed-loop control, ISA-18.2 alarm management, and Safety Instrumented Systems (SIS)",
      "SCADA vs. HMI vs. DCS vs. Historian roles and PackML state models"
    ],
    whyItMatters: "Demonstrates to OT control engineers that you understand deterministic machine control and safety boundaries before connecting edge gateways.",
    readinessTip: "Complete the foundational Ignition Overview, Tags, and Vision/Perspective HMI sections on Inductive University."
  },
  {
    id: "ignition-core",
    title: "Inductive Automation – Ignition Core Certification & Multi-Protocol Integration",
    provider: "Inductive Automation",
    category: "Operational Technology & SCADA",
    tier: "Associate",
    cost: "Inductive University Full Credential: 100% Free (Proctored Core Exam: Paid)",
    requiredModules: ["ot", "protocols"],
    minAvgScore: 82,
    examFormat: "Inductive University: Free online challenges · Core Exam: Practical SCADA project build",
    prepHours: "35–45 hours",
    url: "https://inductiveuniversity.com/",
    domains: [
      "PLC scan cycles, IEC 61131-3 (Ladder & Structured Text), and PID control loops",
      "SCADA, HMI, Historian, and alarm management (ISA-18.2)",
      "Industrial device connectivity: Modbus TCP/RTU, Siemens S7, Allen-Bradley EtherNet/IP",
      "32-bit float word-order decoding, register scaling, UDTs, and sensor simulation"
    ],
    whyItMatters: "Ignition is the fastest-growing modern SCADA/IIoT platform in manufacturing. Completing Inductive University (100% free) is one of the most requested credentials in IIoT job postings.",
    readinessTip: "Download Ignition Maker Edition (free) and practice connecting it to your Modbus and OPC UA simulators."
  },
  {
    id: "opc-ua-specialist",
    title: "OPC Foundation – OPC UA Certified Professional / Academic Certificate",
    provider: "OPC Foundation",
    category: "Operational Technology & Protocols",
    tier: "Specialist",
    cost: "OPC Foundation Online Reference: Free · Official Training Cert: Varies",
    requiredModules: ["protocols", "opcua"],
    minAvgScore: 85,
    examFormat: "Technical assessment covering IEC 62541 architecture, information modeling & security",
    prepHours: "30–40 hours",
    url: "https://opcfoundation.org/developer-tools/certification-test-tools/",
    domains: [
      "OPC UA Address Space: Nodes, NodeIds, References, Objects, Variables, and Methods",
      "Services: Discovery, Browse, Read/Write, Subscriptions, MonitoredItems, and Deadbands",
      "OPC UA Security: Sign vs. SignAndEncrypt, X.509 Application Instance Certificates, and User Auth",
      "Companion Specifications (Machinery, PackML) and OPC UA PubSub (Part 14)"
    ],
    whyItMatters: "OPC UA (IEC 62541) is the mandatory semantic interoperability standard across European (Industrie 4.0) and North American smart factories.",
    readinessTip: "Be crystal clear on the difference between Polling (Read service) and Subscriptions (Sampling Interval vs. Publishing Interval + Deadband) and X.509 certificate trust stores."
  },
  {
    id: "hivemq-mqtt-sparkplug",
    title: "HiveMQ Certified MQTT & Sparkplug B Specialist",
    provider: "HiveMQ Academy",
    category: "Operational Technology & Messaging",
    tier: "Specialist",
    cost: "100% Free (Official HiveMQ Diploma / Certificate)",
    requiredModules: ["mqtt"],
    minAvgScore: 80,
    examFormat: "Online module exams at HiveMQ University",
    prepHours: "12–18 hours",
    url: "https://www.hivemq.com/academy/",
    domains: [
      "MQTT 3.1.1 & MQTT 5.0 architecture: topics, wildcards (+, #), QoS 0/1/2, retained messages, LWT",
      "MQTT 5 features: shared subscriptions, user properties, session/message expiry, reason codes",
      "Sparkplug B (ISO/IEC 20237): spBv1.0 topic namespace, NBIRTH/NDEATH, DBIRTH/DDEATH, NDATA/DDATA, NCMD/DCMD",
      "Report-by-exception, Protobuf payloads, bdSeq/seq numbers, Primary Host STATE, and Unified Namespace design"
    ],
    whyItMatters: "Free, vendor-recognized certificate from HiveMQ that directly proves your mastery of MQTT and Sparkplug B—core requirements for any Unified Namespace (UNS) role.",
    readinessTip: "Know every Sparkplug B message type by heart and understand how Primary Host STATE interacts with edge store-and-forward buffering."
  },
  {
    id: "lf-edgex-nodered",
    title: "Linux Foundation LFEL1004 (EdgeX Foundry) & Industrial Edge Gateway Developer",
    provider: "Linux Foundation Training",
    category: "Edge Computing",
    tier: "Associate",
    cost: "Course: Free on edX / Linux Foundation · Verified Cert optional",
    requiredModules: ["opcua", "mqtt", "edge"],
    minAvgScore: 80,
    examFormat: "Online labs & final assessment",
    prepHours: "25–35 hours",
    url: "https://training.linuxfoundation.org/",
    domains: [
      "Edge computing drivers: latency, bandwidth reduction, offline resilience, and OT/IT segmentation",
      "Southbound protocol ingestion (Modbus, OPC UA, S7) to Northbound MQTT/Sparkplug B",
      "Data normalization, deadband filtering, contextualization (Industrial DataOps), and store-and-forward",
      "Node-RED, EdgeX Foundry microservices, and Eclipse Kura gateway architectures"
    ],
    whyItMatters: "Validates that you can design and configure the actual edge runtime sitting on industrial PCs on the factory floor.",
    readinessTip: "Make sure your portfolio includes a working Node-RED or Java gateway flow with offline store-and-forward buffering."
  },
  {
    id: "cncf-kcna-ckad",
    title: "CNCF Kubernetes & Cloud Native Associate (KCNA) / Certified Kubernetes Application Developer (CKAD)",
    provider: "Cloud Native Computing Foundation / Linux Foundation",
    category: "Edge & Containers",
    tier: "Professional",
    cost: "KCNA: $250 · CKAD: $395",
    requiredModules: ["networking", "edge", "containers"],
    minAvgScore: 85,
    examFormat: "KCNA: 90-min multiple-choice · CKAD: 2-hour hands-on CLI performance exam",
    prepHours: "50–70 hours",
    url: "https://training.linuxfoundation.org/certification/kubernetes-and-cloud-native-associate-kcna/",
    domains: [
      "OCI containers (Docker/Podman), multi-stage builds, rootless security, and multi-arch (ARM64/AMD64) images",
      "Hardware passthrough (/dev/ttyUSB0), host networking, and memory limits on constrained gateways",
      "Lightweight Kubernetes (K3s, KubeEdge): Pods, Deployments, DaemonSets, ConfigMaps, Secrets, Helm",
      "GitOps fleet management (Flux/Argo CD) and container vulnerability/SBOM scanning (Trivy)"
    ],
    whyItMatters: "Modern factories manage hundreds of edge gateways using Docker and K3s with GitOps. KCNA or CKAD proves production-grade container and Kubernetes skills.",
    readinessTip: "Practice multi-stage Dockerfiles and deploying Helm charts onto a local K3s cluster."
  },
  {
    id: "influxdb-university",
    title: "InfluxDB University & Grafana Time-Series Data Specialist Badges",
    provider: "InfluxData (Credly Badges)",
    category: "Data Platform",
    tier: "Associate",
    cost: "100% Free (Official Credly Badges)",
    requiredModules: ["tsdb"],
    minAvgScore: 80,
    examFormat: "Self-paced courses with graded quizzes and hands-on Telegraf/InfluxDB labs",
    prepHours: "15–20 hours",
    url: "https://university.influxdata.com/",
    domains: [
      "Time-series data modeling: Measurements, indexed Tags vs. unindexed Fields, and Cardinality control",
      "InfluxDB Line Protocol, TimescaleDB hypertables, and industrial historian compression",
      "Zero-code ingestion pipelines with Telegraf (MQTT, OPC UA, Modbus inputs)",
      "Retention policies, continuous downsampling tasks, and Grafana operational dashboards"
    ],
    whyItMatters: "InfluxData awards free, verifiable Credly badges for InfluxDB Essentials and Telegraf—essential proof of time-series database competency.",
    readinessTip: "Never put high-cardinality values (UUIDs, timestamps, float readings) into indexed tags!"
  },
  {
    id: "confluent-kafka-dev",
    title: "Confluent Certified Developer for Apache Kafka (CCDAK)",
    provider: "Confluent",
    category: "Data Platform & Broker Fabric",
    tier: "Professional",
    cost: "Exam: $150 (Confluent Developer courses are 100% Free)",
    requiredModules: ["java2", "mqtt", "fabric"],
    minAvgScore: 85,
    examFormat: "90 minutes · 60 multiple-choice questions",
    prepHours: "40–50 hours",
    url: "https://developer.confluent.io/certification/",
    domains: [
      "MQTT vs. Apache Kafka architecture and edge-to-enterprise MQTT-to-Kafka bridging",
      "Brokers, Topics, Partitions, Replication (ISR), Consumer Groups, and Partition Key ordering",
      "Idempotent producers, delivery semantics (at-least-once vs. exactly-once), and Log Compaction",
      "Schema Registry (Avro/Protobuf/JSON Schema), Kafka Connect, and stream processing (Kafka Streams / Flink)"
    ],
    whyItMatters: "When factory data scales across multiple plants, MQTT brokers bridge into Apache Kafka. CCDAK is the premier industry credential for event streaming.",
    readinessTip: "Understand how partitioning by Asset ID preserves chronological event ordering per machine while scaling across consumer instances."
  },
  {
    id: "aws-azure-iot",
    title: "AWS Certified Cloud Practitioner / IoT Specialty Track & Microsoft Azure IoT Operations",
    provider: "Amazon Web Services / Microsoft Learn",
    category: "Cloud & Digital Twins",
    tier: "Associate",
    cost: "AWS SkillBuilder / MS Learn Badges: Free · Cloud Associate Exams: ~$100–$165",
    requiredModules: ["mqtt", "edge", "tsdb", "cloud"],
    minAvgScore: 82,
    examFormat: "90–130 minutes · 65 multiple-choice/multiple-response questions",
    prepHours: "45–60 hours",
    url: "https://learn.microsoft.com/en-us/training/browse/?terms=iot",
    domains: [
      "Cloud IoT ingestion: AWS IoT Core / SiteWise & Azure IoT Hub / Event Grid MQTT",
      "Device identity & provisioning at scale: X.509 certificates, TPM, DPS/JITP, and Device Shadows/Twins",
      "Medallion Lakehouse architecture (Bronze/Silver/Gold) on S3/ADLS with Parquet/Iceberg",
      "Digital Twins: Asset Administration Shell (IEC 63278 / Eclipse BaSyx) and Azure DTDL, plus cloud cost optimization"
    ],
    whyItMatters: "Validates that you can securely bridge plant-floor edge gateways to enterprise cloud analytics and standardized Industry 4.0 Digital Twins.",
    readinessTip: "Know how Device Shadows/Twins synchronize desired vs. reported state for intermittently connected gateways, and how edge aggregation slashes cloud messaging bills."
  },
  {
    id: "isa-iec-62443",
    title: "ISA/IEC 62443 Cybersecurity Fundamentals Specialist & CISA ICS Security",
    provider: "ISA (International Society of Automation) / CISA (Free)",
    category: "Industrial Cybersecurity",
    tier: "Specialist",
    cost: "CISA ICS Certificates: 100% Free · ISA 62443 Exam (IC32): Paid",
    requiredModules: ["orientation", "networking", "ot", "security"],
    minAvgScore: 85,
    examFormat: "CISA: Free online assessments · ISA IC32: Proctored exam (75–100 questions)",
    prepHours: "40–50 hours",
    url: "https://www.isa.org/certification/certificate-programs/isa-iec-62443-cybersecurity-certificate-program",
    domains: [
      "OT threat landscape (Stuxnet, TRITON, Industroyer) and MITRE ATT&CK for ICS",
      "IEC 62443 risk models: Zones, Conduits, Security Levels (SL 1–4), and the 7 Foundational Requirements",
      "Defense-in-depth: Purdue segmentation, Level 3.5 Industrial DMZ, Data Diodes, and outbound-only TLS from edge",
      "PKI for OPC UA & MQTT, SBOMs, vulnerability scanning, EU NIS2, and the Cyber Resilience Act (CRA)"
    ],
    whyItMatters: "ISA/IEC 62443 is the #1 most respected OT cybersecurity credential worldwide. You can also immediately earn free official completion certificates from US CISA ICS Training.",
    readinessTip: "Master the Zones & Conduits model (IEC 62443-3-2), Security Levels SL 1–4, and why OT prioritizes Availability over Confidentiality."
  },
  {
    id: "industrial-ai-pdm",
    title: "Kaggle Machine Learning & Industrial Predictive Maintenance Specialist",
    provider: "Kaggle Learn (Free Certificates) / DeepLearning.AI",
    category: "Analytics & Industrial AI",
    tier: "Specialist",
    cost: "Kaggle Certificates: 100% Free",
    requiredModules: ["tsdb", "analytics"],
    minAvgScore: 80,
    examFormat: "Hands-on Python coding notebooks & quiz assessments",
    prepHours: "25–35 hours",
    url: "https://www.kaggle.com/learn",
    domains: [
      "Manufacturing KPIs: real-time OEE (Availability × Performance × Quality), MTBF, MTTR",
      "Signal processing: time-domain features (RMS, Kurtosis, Crest Factor) and frequency-domain FFT for bearing vibration",
      "Anomaly detection (Isolation Forest, Autoencoders) and Remaining Useful Life (RUL) regression",
      "Edge MLOps: exporting models to ONNX Runtime / TFLite, preventing time-series data leakage, and handling class imbalance"
    ],
    whyItMatters: "Bridges data science with physical machinery—showing you understand vibration physics (FFT, RMS) and portable edge deployment (ONNX) rather than just generic tabular ML.",
    readinessTip: "Complete the free Kaggle Pandas, Feature Engineering, and Intro to ML certificates, and publish your NASA C-MAPSS or CWRU bearing RUL notebook on GitHub."
  },
  {
    id: "iiot-architect-capstone",
    title: "Full-Stack IIoT Solutions Architect – Master Portfolio & Career Readiness",
    provider: "IIoT Pathfinder Capstone Board",
    category: "Full-Stack Architecture",
    tier: "Master",
    cost: "Included in Path",
    requiredModules: [
      "orientation","networking","java1","java2","zos","jcl","pli","mfint",
      "ot","protocols","opcua","mqtt","edge","containers","tsdb","fabric",
      "cloud","security","analytics","capstone"
    ],
    minAvgScore: 85,
    examFormat: "Complete all 20 modules (≥85% avg) + End-to-End 'Smart Factory in a Box' Capstone",
    prepHours: "Full 420-hour Roadmap",
    url: "https://eclipse.dev/",
    domains: [
      "Shop-floor OT connectivity: Soft PLCs, Modbus TCP/RTU, OPC UA, and realistic sensor simulation",
      "Edge & Container engineering: Java (Milo/PLC4X/Paho), Node-RED, Docker/K3s, and Sparkplug B UNS",
      "Enterprise & Mainframe integration: Kafka streaming, InfluxDB/TimescaleDB, IBM MQ, JCL, and PL/I batch",
      "Cloud Digital Twins (AAS), IEC 62443 security hardening, and ONNX predictive maintenance at the edge"
    ],
    whyItMatters: "Confirms you have mastered the entire spectrum from 4–20 mA sensors and PLCs to edge gateways, Unified Namespaces, cloud digital twins, and mainframe ERP integration.",
    readinessTip: "Record a 4-minute walkthrough video of your 'Smart Factory in a Box' running via docker compose up and pin it to your LinkedIn and GitHub."
  }
];
