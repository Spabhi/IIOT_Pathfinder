/* Modules 10–19 : OPC UA, MQTT/Sparkplug, edge, data, cloud, security, capstone */
window.MODULES_PART2 = [
{
id:"opcua", phase:"Phase 4 · Operational Technology", icon:"🔷", title:"OPC UA – Unified Architecture", hours:22, level:"Intermediate",
summary:"OPC UA (IEC 62541) is the vendor-neutral, secure, semantic standard for industrial interoperability. Learn its information model, services, security and pub/sub, and build clients and servers.",
objectives:["Explain the OPC UA address space, nodes and references","Use Browse, Read, Write, Subscriptions and Methods","Configure security modes, policies and certificates","Know companion specifications and OPC UA PubSub"],
lessons:[
{title:"From OPC Classic to UA",html:`<p>OPC Classic (DA/HDA/A&amp;E, 1996) relied on Windows DCOM. <b>OPC UA</b> (2008) is platform-independent, secure by design, and models data <i>with semantics</i>. Transports: binary TCP <code>opc.tcp://host:4840</code>, HTTPS, WebSockets; plus PubSub over UDP/MQTT/AMQP; and UAFX (field level, over TSN).</p>`},
{title:"Information model",html:`<p>The <b>address space</b> is a graph of <b>nodes</b> connected by <b>references</b>. Node classes: Object, Variable, Method, ObjectType, VariableType, ReferenceType, DataType, View.</p><ul><li><b>NodeId</b>: <code>ns=2;s=Line1.Motor1.Speed</code> or <code>ns=0;i=2258</code> (Server_ServerStatus_CurrentTime)</li><li>Attributes: Value, DataType, BrowseName, DisplayName, AccessLevel…</li><li><b>DataValue</b> = value + <b>StatusCode</b> (Good/Uncertain/Bad) + SourceTimestamp + ServerTimestamp</li><li>Type system: define a <code>PumpType</code> once, instantiate many pumps – the basis of semantic interoperability</li></ul><p><b>Companion specifications</b> (with VDMA, OPC Foundation): Machinery, PackML, Robotics, CNC, MTConnect, Euromap (plastics), ISA-95, PROFINET, IO-Link, Weihenstephan (food & beverage)… Models are written in NodeSet2.xml (tooling: UaModeler, SiOME, open-source <i>UA-ModelCompiler</i>).</p>`},
{title:"Services & subscriptions",html:`<p>Service sets: Discovery, SecureChannel, Session, NodeManagement, View (<b>Browse</b>), Attribute (<b>Read/Write</b>, HistoryRead), Method (<b>Call</b>), <b>MonitoredItem & Subscription</b>. Subscriptions are the efficient way to get data: the server samples (SamplingInterval), filters (Deadband: absolute/percent) and pushes notifications on each PublishingInterval.</p><pre># Python asyncua client
import asyncio
from asyncua import Client
async def main():
    async with Client("opc.tcp://localhost:50000") as c:
        node = c.get_node("ns=3;s=SlowUInt1")
        print(await node.read_value())
        class H:
            def datachange_notification(self, n, val, data): print(n, val)
        sub = await c.create_subscription(500, H())
        await sub.subscribe_data_change(node)
        await asyncio.sleep(10)
asyncio.run(main())</pre><pre>// Java – Eclipse Milo
OpcUaClient client = OpcUaClient.create("opc.tcp://localhost:4840");
client.connect().get();
DataValue v = client.readValue(0, TimestampsToReturn.Both, new NodeId(2, "Line1.Motor1.Speed")).get();</pre>`},
{title:"Security",html:`<ul><li>Security modes: <b>None</b>, <b>Sign</b>, <b>SignAndEncrypt</b></li><li>Security policies: Basic256Sha256, Aes128_Sha256_RsaOaep, Aes256_Sha256_RsaPss (older Basic128Rsa15/Basic256 are deprecated)</li><li>X.509 application instance certificates – mutual trust lists (trusted/rejected folders); GDS (Global Discovery Server) for certificate management</li><li>User authentication: Anonymous, Username/Password, X.509 user certificate, issued tokens (JWT)</li><li>Role-based access to nodes</li></ul>`},
{title:"PubSub & architectures",html:`<p>Client/server is great for configuration and on-demand reads; <b>OPC UA PubSub</b> (Part 14) decouples via brokers (MQTT/AMQP, JSON or UADP encoding) or brokerless UDP multicast. Common architecture: PLCs expose OPC UA servers → edge gateway subscribes → maps to MQTT/Sparkplug for the UNS. Aggregating servers (Kepware, open62541-based) consolidate many devices.</p>`}
],
lab:{title:"Lab: OPC UA client & server",html:`<ol><li>Start a simulator: <code>docker run -p 50000:50000 mcr.microsoft.com/iotedge/opc-plc --pn=50000 --autoaccept --unsecuretransport</code> or Prosys Simulation Server.</li><li>Browse it with UaExpert (free) – inspect NodeIds, attributes, StatusCodes, timestamps.</li><li>Write a Java (Milo) or Python (asyncua) client subscribing to 5 nodes with a 1 % deadband.</li><li>Build your own server exposing a <code>PumpType</code> with Speed, Temperature, State and a <code>Start()</code> method, fed by your sensor simulator.</li><li>Enable SignAndEncrypt and exchange certificates.</li></ol>`},
resources:[{name:"OPC Foundation – specifications & reference",url:"https://reference.opcfoundation.org/"},{name:"OPC Foundation Academy / UA Online Reference",url:"https://opcfoundation.org/"},{name:"open62541 (C, open source)",url:"https://www.open62541.org/"},{name:"opcua-asyncio (Python)",url:"https://github.com/FreeOpcUa/opcua-asyncio"},{name:"Eclipse Milo examples",url:"https://github.com/eclipse/milo/tree/master/milo-examples"},{name:"Unified Automation UaExpert (free client)",url:"https://www.unified-automation.com/products/development-tools/uaexpert.html"},{name:"Prosys OPC UA Simulation Server",url:"https://www.prosysopc.com/products/opc-ua-simulation-server/"}],
quiz:[
{q:"The default OPC UA TCP port is…",options:["502","1883","4840","8080"],a:2,why:"opc.tcp default port 4840."},
{q:"Which component tells you whether a value is trustworthy?",options:["BrowseName","StatusCode","NodeClass","Namespace URI"],a:1,why:"DataValue StatusCode = Good/Uncertain/Bad."},
{q:"The most efficient way to receive changing values is…",options:["Polling Read every 10 ms","MonitoredItems in a Subscription","Writing to the node","Browsing repeatedly"],a:1,why:"Server samples and pushes only changes."},
{q:"Which security mode both signs and encrypts messages?",options:["None","Sign","SignAndEncrypt","Anonymous"],a:2,why:"SignAndEncrypt provides integrity and confidentiality."},
{q:"Companion specifications provide…",options:["Hardware drivers","Standardised information models for specific domains/machines","Cloud pricing","Licence keys"],a:1,why:"E.g. Machinery, PackML, Robotics models."}
]},

{
id:"mqtt", phase:"Phase 4 · Operational Technology", icon:"📨", title:"MQTT & Sparkplug B", hours:20, level:"Intermediate",
summary:"MQTT is the lightweight pub/sub backbone of IIoT. Sparkplug B adds a standard topic namespace, Protobuf payloads and state management that turns MQTT into an interoperable industrial protocol.",
objectives:["Use MQTT topics, wildcards, QoS, retained messages, LWT, sessions","Use MQTT 5 features","Understand Sparkplug B topics, message types, birth/death certificates and sequence numbers","Design a Unified Namespace"],
lessons:[
{title:"MQTT core concepts",html:`<ul><li>Clients connect to a <b>broker</b>; publishers and subscribers are decoupled in space, time and sync</li><li><b>Topics</b>: hierarchical <code>enterprise/site/area/line/cell/tag</code>; wildcards <code>+</code> (single level) and <code>#</code> (multi-level)</li><li><b>QoS 0</b> at most once, <b>QoS 1</b> at least once (PUBACK), <b>QoS 2</b> exactly once (4-way handshake)</li><li><b>Retained messages</b> – last value delivered to new subscribers</li><li><b>Last Will & Testament</b> – broker publishes on ungraceful disconnect</li><li>Keep-alive, clean/persistent sessions</li><li><b>MQTT 5</b>: reason codes, user properties, message expiry, shared subscriptions (<code>$share/group/topic</code>) for load balancing, topic aliases, request/response</li><li>Security: TLS on 8883, username/password, client certificates, ACLs per topic</li></ul><pre>mosquitto_sub -h localhost -t 'acme/berlin/#' -v
mosquitto_pub -h localhost -t 'acme/berlin/packaging/line1/temp' -m '{"v":72.4,"ts":1730540000}' -q 1 -r</pre>`},
{title:"Why plain MQTT isn't enough",html:`<p>MQTT says nothing about topic structure, payload format, data types or whether a device is online. Every vendor did it differently → integration chaos. <b>Sparkplug</b> (Eclipse Foundation, now <b>ISO/IEC 20237:2023</b>) fixes this.</p>`},
{title:"Sparkplug B specification",html:`<p>Topic namespace: <code>spBv1.0/&lt;group_id&gt;/&lt;message_type&gt;/&lt;edge_node_id&gt;/[&lt;device_id&gt;]</code></p><table><tr><th>Message</th><th>Meaning</th></tr><tr><td>NBIRTH / NDEATH</td><td>Edge node birth/death certificate (NDEATH registered as LWT)</td></tr><tr><td>DBIRTH / DDEATH</td><td>Device birth/death</td></tr><tr><td>NDATA / DDATA</td><td>Report by exception – only changed metrics</td></tr><tr><td>NCMD / DCMD</td><td>Commands (e.g. rebirth, write setpoint)</td></tr><tr><td>STATE</td><td>Primary Host Application online state (<code>spBv1.0/STATE/&lt;host_id&gt;</code>, retained)</td></tr></table><ul><li>Payload: <b>Google Protocol Buffers</b> – timestamp, metrics (name, alias, datatype, value), seq</li><li><b>Birth certificates</b> declare all metrics with data types, enabling auto-discovery; later DATA messages may use numeric <b>aliases</b> to save bandwidth</li><li><b>seq</b> 0–255 detects lost messages → host sends a Rebirth NCMD</li><li><b>bdSeq</b> links NBIRTH to the matching NDEATH</li><li>Primary Host awareness: edge nodes buffer data while the SCADA/host is offline (store-and-forward)</li><li>Templates (UDTs) for complex types</li></ul><p>Ecosystem: Eclipse Tahu (reference libs Java/Python/C/JS), Ignition + Cirrus Link MQTT modules, HiveMQ Sparkplug extension, EMQX, Node-RED Sparkplug nodes, Chariot broker.</p>`},
{title:"Unified Namespace design",html:`<p>UNS = event-driven, single source of truth of the <i>current state</i> of the business, structured by ISA-95 hierarchy. Many architectures combine: Sparkplug B for the OT edge-to-SCADA plane (state-aware, efficient) and plain JSON MQTT topics in ISA-95 structure for IT consumers. Best practices: consistent naming, units in metadata, don't publish everything – publish what has value, separate raw/contextualised/KPI namespaces.</p>`}
],
lab:{title:"Lab: Sparkplug edge node",html:`<ol><li>Run a broker: <code>docker run -p 1883:1883 -p 8080:8080 hivemq/hivemq-ce</code> (or EMQX / Mosquitto).</li><li>Using Eclipse Tahu (Java) or <code>mqtt-spb-wrapper</code> (Python), create an edge node <code>spBv1.0/PlantA/NBIRTH/Gateway1</code> with a device <code>Filler1</code> publishing your simulated metrics.</li><li>Register NDEATH as LWT, implement seq numbers and Rebirth NCMD handling.</li><li>Decode messages with MQTT Explorer (has Sparkplug decoding) and kill the process to observe NDEATH.</li><li>Bonus: connect Ignition Maker + MQTT Engine as primary host.</li></ol>`},
resources:[{name:"MQTT Essentials (HiveMQ, free series)",url:"https://www.hivemq.com/mqtt/"},{name:"MQTT 5 specification (OASIS)",url:"https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html"},{name:"Eclipse Sparkplug specification",url:"https://sparkplug.eclipse.org/"},{name:"Eclipse Tahu (reference implementation)",url:"https://github.com/eclipse/tahu"},{name:"MQTT Explorer",url:"https://mqtt-explorer.com/"},{name:"Eclipse Mosquitto",url:"https://mosquitto.org/"},{name:"Sparkplug Essentials (HiveMQ)",url:"https://www.hivemq.com/sparkplug/"}],
quiz:[
{q:"Which wildcard matches exactly one topic level?",options:["#","+","*","?"],a:1,why:"+ is single-level, # is multi-level."},
{q:"QoS 1 guarantees…",options:["At most once","At least once","Exactly once","No delivery"],a:1,why:"Duplicates possible, no loss."},
{q:"In Sparkplug B, the NDEATH message is typically…",options:["Sent every minute","Registered as the MQTT Last Will","Sent by the host","Retained forever"],a:1,why:"The broker publishes it if the edge node disconnects ungracefully."},
{q:"Sparkplug B payloads are encoded using…",options:["XML","Protocol Buffers","CSV","EBCDIC"],a:1,why:"Google Protobuf."},
{q:"What does a gap in the Sparkplug seq number trigger?",options:["Nothing","A Rebirth request from the host","Broker shutdown","Data deletion"],a:1,why:"The host requests a rebirth to resynchronise state."},
{q:"Sparkplug is standardised as…",options:["ISO/IEC 20237","IEC 62541","ISA-95","IEEE 1588"],a:0,why:"ISO/IEC 20237:2023."}
]},

{
id:"edge", phase:"Phase 5 · Edge Computing", icon:"🧱", title:"Edge Runtime & Industrial Gateways", hours:20, level:"Intermediate",
summary:"The edge gateway is where OT meets IT: protocol conversion, buffering, filtering, contextualisation and local analytics. Learn gateway hardware, edge runtimes and frameworks.",
objectives:["Explain edge vs fog vs cloud and why edge is needed","Choose gateway hardware and OS","Build flows with Node-RED, EdgeX Foundry, Eclipse Kura","Implement buffering, normalisation and local rules"],
lessons:[
{title:"Why the edge?",html:`<ul><li><b>Latency</b> – local decisions in ms</li><li><b>Bandwidth</b> – a vibration sensor at 25 kHz produces GBs/day; send features, not raw waveforms</li><li><b>Resilience</b> – production must continue when the WAN is down</li><li><b>Security/sovereignty</b> – data stays on site, single controlled outbound connection</li><li><b>Protocol translation</b> – legacy fieldbus → OPC UA/MQTT</li></ul>`},
{title:"Gateway hardware & OS",html:`<p>Industrial PCs (Siemens IPC/Industrial Edge, Advantech, Moxa UC, Beckhoff), DIN-rail gateways, Raspberry Pi/Revolution Pi (dev), NVIDIA Jetson (AI vision). Consider: fanless, −20…+60 °C, 24 VDC, dual Ethernet (OT/IT separation), serial ports, TPM for secure boot, watchdog. OS: Debian/Ubuntu Core, Yocto-built Linux, Windows IoT, real-time Linux (PREEMPT_RT).</p>`},
{title:"Edge runtimes & frameworks",html:`<table><tr><th>Platform</th><th>Highlights</th></tr><tr><td><b>Node-RED</b></td><td>Low-code flow-based (OpenJS); nodes for Modbus, OPC UA, S7, MQTT, Sparkplug, InfluxDB</td></tr><tr><td><b>EdgeX Foundry</b></td><td>LF Edge microservices: device services → core data → app services</td></tr><tr><td><b>Eclipse Kura</b></td><td>Java/OSGi gateway framework, Kura Wires, cloud connectors</td></tr><tr><td><b>Apache PLC4X / Camel</b></td><td>Java integration</td></tr><tr><td>Telegraf / Benthos (Redpanda Connect)</td><td>Agents for metrics & stream processing</td></tr><tr><td>AWS IoT Greengrass, Azure IoT Edge</td><td>Cloud-managed edge runtimes</td></tr><tr><td>Litmus Edge, HighByte, Siemens Industrial Edge, Ignition Edge</td><td>Commercial DataOps/edge platforms</td></tr><tr><td>United Manufacturing Hub</td><td>Open-source UNS stack on Kubernetes</td></tr></table>`},
{title:"Edge data processing",html:`<ul><li><b>Normalisation</b>: units, naming, data types</li><li><b>Contextualisation</b>: attach asset, order, product, shift info (Industrial DataOps)</li><li><b>Filtering</b>: deadband, report-by-exception, downsampling, aggregation windows</li><li><b>Store-and-forward</b> buffers (disk-backed queues)</li><li><b>Local analytics</b>: rules, OEE calculation, FFT, ML inference (ONNX Runtime, TensorFlow Lite)</li><li><b>Device management</b>: OTA updates, remote configuration, monitoring (LwM2M, Eclipse hawkBit)</li></ul>`}
],
lab:{title:"Lab: Node-RED gateway",html:`<ol><li><code>docker run -p 1880:1880 nodered/node-red</code>; install <code>node-red-contrib-modbus</code>, <code>node-red-contrib-opcua</code>, <code>node-red-contrib-mqtt-sparkplug-plus</code>.</li><li>Read your Modbus simulator and OPC PLC, normalise into one JSON model per asset.</li><li>Apply deadband filtering and compute a 1-minute average.</li><li>Publish to the UNS in ISA-95 topics and as Sparkplug B.</li><li>Stop the broker and verify buffering + replay.</li></ol>`},
resources:[{name:"Node-RED documentation",url:"https://nodered.org/docs/"},{name:"EdgeX Foundry",url:"https://www.edgexfoundry.org/"},{name:"Eclipse Kura",url:"https://eclipse.dev/kura/"},{name:"LF Edge projects",url:"https://www.lfedge.org/"},{name:"United Manufacturing Hub (open source)",url:"https://www.umh.app/"},{name:"Eclipse hawkBit (OTA updates)",url:"https://eclipse.dev/hawkbit/"}],
quiz:[
{q:"The main reason NOT to stream raw 25 kHz vibration to the cloud is…",options:["It's illegal","Bandwidth and cost – edge should extract features","MQTT can't carry numbers","Clouds reject floats"],a:1,why:"Edge reduces data volume by computing features."},
{q:"Node-RED is…",options:["A PLC","A flow-based low-code programming tool","A time-series database","A firewall"],a:1,why:"OpenJS Foundation flow-based tool."},
{q:"EdgeX Foundry is hosted by…",options:["LF Edge (Linux Foundation)","IBM","OPC Foundation","ISA"],a:0,why:"It's an LF Edge project."},
{q:"Contextualisation means…",options:["Encrypting data","Enriching raw values with asset, order and product metadata","Deleting data","Compressing images"],a:1,why:"Raw tags gain business meaning."},
{q:"Why do gateways often have two Ethernet ports?",options:["Speed doubling","Separating OT and IT networks","Power","Decoration"],a:1,why:"Network segmentation."}
]},

{
id:"containers", phase:"Phase 5 · Edge Computing", icon:"📦", title:"Lightweight Containers & Edge Orchestration", hours:18, level:"Intermediate",
summary:"Package and deploy edge applications reproducibly with Docker/Podman, small images, and lightweight Kubernetes (K3s, MicroK8s, KubeEdge), plus GitOps for fleets of gateways.",
objectives:["Build small, secure multi-stage images for ARM and x86","Compose multi-service stacks with Docker Compose","Deploy to K3s with Helm and manage fleets with GitOps","Understand resource limits, device access and real-time constraints"],
lessons:[
{title:"Container fundamentals",html:`<p>Images, layers, registries, containers, volumes, networks. Runtimes: Docker, <b>Podman</b> (daemonless, rootless, systemd-friendly via Quadlet), containerd. OCI standard.</p><pre># Multi-stage Java gateway image
FROM eclipse-temurin:21-jdk AS build
WORKDIR /src
COPY . .
RUN ./mvnw -q package -DskipTests
FROM eclipse-temurin:21-jre-alpine
RUN adduser -D app
USER app
COPY --from=build /src/target/gateway.jar /app/gateway.jar
ENTRYPOINT ["java","-XX:MaxRAMPercentage=70","-jar","/app/gateway.jar"]</pre><p>Shrink images: alpine/distroless, GraalVM native image, jlink custom runtimes. Multi-arch builds: <code>docker buildx build --platform linux/amd64,linux/arm64 -t reg/gw:1.0 --push .</code></p>`},
{title:"Docker Compose edge stack",html:`<pre>services:
  broker:   { image: emqx/emqx:5, ports: ["1883:1883","18083:18083"], restart: always }
  nodered:  { image: nodered/node-red, ports: ["1880:1880"], volumes: ["nr:/data"] }
  influxdb: { image: influxdb:2, ports: ["8086:8086"], volumes: ["influx:/var/lib/influxdb2"] }
  grafana:  { image: grafana/grafana, ports: ["3000:3000"] }
  gateway:  { image: reg/gw:1.0, devices: ["/dev/ttyUSB0"], mem_limit: 256m, depends_on: [broker] }
volumes: { nr: {}, influx: {} }</pre><p>Note <code>devices</code> for serial Modbus RTU, <code>network_mode: host</code> for multicast/discovery protocols, restart policies and healthchecks.</p>`},
{title:"Lightweight Kubernetes",html:`<ul><li><b>K3s</b> – CNCF single-binary Kubernetes (&lt;100 MB), ideal for gateways; <b>MicroK8s</b>, <b>k0s</b></li><li><b>KubeEdge</b>, <b>OpenYurt</b> – cloud-managed edge nodes, offline autonomy</li><li>Helm charts, ConfigMaps/Secrets, DaemonSets, node affinity, resource requests/limits</li><li><b>GitOps</b> with Flux/Argo CD – each site pulls desired state from Git; great for hundreds of plants</li><li>Fleet tools: Rancher Fleet, Balena, Portainer, Azure Arc, AWS Greengrass</li></ul>`},
{title:"Edge-specific concerns",html:`<p>Limited CPU/RAM/flash wear (log rotation!), intermittent connectivity (pre-pulled images, local registry mirror), real-time workloads (often kept outside containers or using RT kernels/CPU pinning), image signing (Cosign/Sigstore), SBOMs and vulnerability scanning (Trivy) – required by IEC 62443 and the EU Cyber Resilience Act.</p>`}
],
lab:{title:"Lab: Containerise the stack",html:`<ol><li>Write a multi-stage Dockerfile for your Java gateway; measure image size (&lt;150 MB target).</li><li>Create a Compose file with broker, Node-RED, InfluxDB, Grafana, simulators and gateway.</li><li>Install K3s (<code>curl -sfL https://get.k3s.io | sh -</code>) on a VM/Pi and deploy the broker via Helm.</li><li>Scan images with Trivy and fix critical vulnerabilities.</li></ol>`},
resources:[{name:"Docker docs – Get started",url:"https://docs.docker.com/get-started/"},{name:"Podman",url:"https://podman.io/"},{name:"K3s",url:"https://k3s.io/"},{name:"KubeEdge",url:"https://kubeedge.io/"},{name:"Flux CD (GitOps)",url:"https://fluxcd.io/"},{name:"Trivy scanner",url:"https://trivy.dev/"},{name:"Kubernetes basics tutorial",url:"https://kubernetes.io/docs/tutorials/kubernetes-basics/"}],
quiz:[
{q:"A multi-stage Docker build mainly helps to…",options:["Run multiple containers","Produce small runtime images without build tools","Use Windows","Encrypt images"],a:1,why:"Build tools stay in the build stage."},
{q:"Which is a lightweight Kubernetes distribution for edge?",options:["K3s","OpenShift Full","Mesos","Nomad"],a:0,why:"K3s is a CNCF-certified minimal distro."},
{q:"To access a serial Modbus RTU adapter from a container you use…",options:["ports","devices mapping (/dev/ttyUSB0)","volumes only","ENV"],a:1,why:"Map the device node into the container."},
{q:"GitOps means…",options:["Using Git as source of truth; agents pull and reconcile desired state","Emailing configs","SSH-ing manually","Using GitHub Pages"],a:0,why:"Flux/Argo reconcile from Git."},
{q:"Which tool generates vulnerability reports for images?",options:["Trivy","Grafana","Mosquitto","JCL"],a:0,why:"Trivy scans images and SBOMs."}
]},

{
id:"tsdb", phase:"Phase 6 · Data Platform", icon:"📈", title:"Time-Series Ingestion & Storage", hours:18, level:"Intermediate",
summary:"Industrial data is time-series. Learn modelling, ingestion pipelines, retention/downsampling, and databases such as InfluxDB, TimescaleDB, QuestDB and historians, plus visualisation with Grafana.",
objectives:["Model time-series data (measurement, tags, fields)","Build ingestion with Telegraf/Node-RED/Kafka Connect","Apply retention, downsampling, compression","Query with Flux/InfluxQL/SQL and build Grafana dashboards"],
lessons:[
{title:"Time-series characteristics",html:`<p>Append-heavy, timestamp-ordered, high cardinality, queries over windows (avg per 5 min), recent data hot, old data cold. Key concepts: <b>cardinality</b> (unique series count – the #1 performance killer), irregular vs regular sampling, late/out-of-order data, timestamp source (device vs ingestion), quality flags.</p>`},
{title:"Databases",html:`<table><tr><th>DB</th><th>Model</th><th>Notes</th></tr><tr><td>InfluxDB (v2/v3)</td><td>measurement, tags, fields; line protocol</td><td>v3 is built on Apache Arrow/Parquet, SQL support</td></tr><tr><td>TimescaleDB</td><td>PostgreSQL extension, hypertables</td><td>Full SQL, joins with relational asset data, continuous aggregates</td></tr><tr><td>QuestDB, ClickHouse</td><td>Columnar SQL</td><td>Very high ingest/analytics</td></tr><tr><td>Apache IoTDB</td><td>Device-tree model</td><td>Built for IIoT</td></tr><tr><td>AVEVA PI, Canary, Ignition historian</td><td>Industrial historians</td><td>Compression (swinging door), OT integration</td></tr><tr><td>Prometheus</td><td>Metrics</td><td>IT monitoring, not for process data</td></tr></table>
<pre># InfluxDB line protocol
machine_temp,site=berlin,line=2,asset=filler1 value=72.4,quality=192i 1730540000000000000</pre><pre>-- TimescaleDB
CREATE TABLE readings(ts TIMESTAMPTZ NOT NULL, asset TEXT, metric TEXT, value DOUBLE PRECISION);
SELECT create_hypertable('readings','ts');
SELECT time_bucket('5 minutes', ts) b, asset, avg(value) FROM readings
WHERE metric='temp' AND ts &gt; now() - interval '1 day' GROUP BY b, asset ORDER BY b;</pre>`},
{title:"Ingestion pipelines",html:`<p>Patterns: MQTT → Telegraf (<code>inputs.mqtt_consumer</code>, also <code>inputs.opcua</code>, <code>inputs.modbus</code>) → InfluxDB; MQTT → Kafka → Kafka Connect sink → Timescale; Sparkplug host → historian. Concerns: batching, back-pressure, idempotent writes, schema evolution, dead-letter handling, timestamp precision, time sync (NTP/PTP IEEE 1588).</p><pre>[[inputs.mqtt_consumer]]
  servers = ["tcp://broker:1883"]
  topics = ["acme/+/+/+/+/temp"]
  data_format = "json"
  [[inputs.mqtt_consumer.topic_parsing]]
    topic = "acme/+/+/+/+/temp"
    tags = "_/site/area/line/asset/_"
[[outputs.influxdb_v2]]
  urls = ["http://influxdb:8086"]
  token = "$INFLUX_TOKEN"
  organization = "acme"
  bucket = "raw"</pre>`},
{title:"Lifecycle & visualisation",html:`<p>Retention policies (raw 30 days, 1-min aggregates 1 year, hourly forever), continuous aggregates/downsampling tasks, compression, tiered storage to object storage (Parquet on S3). Visualise in <b>Grafana</b>: time-series panels, state timelines (machine states), alerting rules, variables for site/line selection.</p>`}
],
lab:{title:"Lab: Ingest & visualise",html:`<ol><li>Add Telegraf to your Compose stack subscribing to the UNS.</li><li>Store raw data in InfluxDB (or Timescale) with site/line/asset tags.</li><li>Create a downsampling task to 1-minute averages and a 7-day raw retention.</li><li>Build a Grafana dashboard: live temperatures, machine state timeline, OEE stat panel, alert on high temperature.</li></ol>`},
resources:[{name:"InfluxDB documentation",url:"https://docs.influxdata.com/"},{name:"Telegraf plugins",url:"https://docs.influxdata.com/telegraf/latest/plugins/"},{name:"TimescaleDB docs",url:"https://docs.timescale.com/"},{name:"Apache IoTDB",url:"https://iotdb.apache.org/"},{name:"QuestDB",url:"https://questdb.io/docs/"},{name:"Grafana tutorials",url:"https://grafana.com/tutorials/"}],
quiz:[
{q:"In InfluxDB, which should be used for indexed metadata like site and asset?",options:["Fields","Tags","Timestamps","Buckets"],a:1,why:"Tags are indexed; fields hold values."},
{q:"High cardinality refers to…",options:["Many unique series","Large values","Slow networks","Many dashboards"],a:0,why:"Unique tag combinations explode index size."},
{q:"TimescaleDB is…",options:["A PostgreSQL extension","A NoSQL KV store","An MQTT broker","A PLC"],a:0,why:"It adds hypertables to PostgreSQL."},
{q:"Downsampling means…",options:["Deleting all data","Aggregating high-resolution data into coarser intervals","Raising sample rate","Encrypting"],a:1,why:"E.g. raw → 1-min averages."},
{q:"Which protocol provides sub-microsecond clock synchronisation?",options:["NTP","PTP (IEEE 1588)","HTTP","FTP"],a:1,why:"Precision Time Protocol."}
]},

{
id:"fabric", phase:"Phase 6 · Data Platform", icon:"🕸", title:"Message Broker Fabric & Streaming", hours:20, level:"Advanced",
summary:"Scale from one broker to an enterprise event fabric: MQTT broker clustering & bridging, Apache Kafka, stream processing, schemas, and multi-site Unified Namespace architectures.",
objectives:["Compare MQTT brokers and Kafka and know when to use each","Design clustering, bridging and multi-site topologies","Process streams with Kafka Streams/Flink","Govern schemas, ordering, delivery semantics"],
lessons:[
{title:"MQTT vs Kafka",html:`<table><tr><th></th><th>MQTT broker</th><th>Kafka</th></tr><tr><td>Strength</td><td>Millions of lightweight device connections, unreliable networks</td><td>Durable, replayable log, high-throughput analytics</td></tr><tr><td>Storage</td><td>Transient (retained last value)</td><td>Retention days–forever, partitions</td></tr><tr><td>Consumers</td><td>Push to subscribers</td><td>Pull, consumer groups, offsets</td></tr><tr><td>Typical role</td><td>Edge/plant UNS</td><td>Enterprise backbone, data lake feed</td></tr></table><p>Common pattern: <b>MQTT at the edge → bridge → Kafka in the data centre/cloud</b> (HiveMQ Kafka extension, EMQX data integration, Kafka Connect MQTT source, Confluent MQTT proxy).</p>`},
{title:"Broker landscape & topology",html:`<ul><li>MQTT: Mosquitto (light), <b>HiveMQ</b> (Java, enterprise clustering), <b>EMQX</b> (Erlang, massive scale), VerneMQ, NanoMQ (edge), Cedalo Pro Mosquitto, RabbitMQ MQTT plugin</li><li>Streaming: Apache Kafka (KRaft mode, no ZooKeeper), Redpanda, Apache Pulsar, NATS JetStream</li><li>Topologies: clustered broker per site → bridged to central cluster (topic remapping, filtered upward), hub-and-spoke vs mesh, active/active across regions, edge brokers with store-and-forward</li><li>Load balancing: MQTT 5 shared subscriptions, Kafka partitions keyed by asset id (preserves per-asset ordering)</li></ul>`},
{title:"Kafka essentials",html:`<pre>kafka-topics.sh --create --topic plant.telemetry --partitions 12 --replication-factor 3 --bootstrap-server kafka:9092</pre><pre>Properties p = new Properties();
p.put("bootstrap.servers","kafka:9092"); p.put("acks","all"); p.put("enable.idempotence","true");
p.put("key.serializer", StringSerializer.class.getName()); p.put("value.serializer", StringSerializer.class.getName());
try (var prod = new KafkaProducer&lt;String,String&gt;(p)) {
    prod.send(new ProducerRecord&lt;&gt;("plant.telemetry", assetId, json));
}</pre><p>Concepts: brokers, topics, partitions, replication, ISR, consumer groups, offsets, compacted topics (latest state per key – a Kafka-native "UNS"), exactly-once semantics, Schema Registry (Avro/Protobuf/JSON Schema), Kafka Connect, Kafka Streams/ksqlDB, Apache Flink for windowed analytics (e.g., OEE per shift, CEP for alarms).</p>`},
{title:"Governance",html:`<p>Topic naming standards, schema versioning and compatibility, ACLs and multi-tenancy, observability (broker metrics, consumer lag), data contracts between OT producers and IT consumers, cost of retention. Delivery semantics end-to-end: MQTT QoS 1 + idempotent Kafka producer + dedup keys.</p>`}
],
lab:{title:"Lab: Edge-to-enterprise fabric",html:`<ol><li>Run two MQTT brokers (site A, site B) and bridge both to a central EMQX/HiveMQ.</li><li>Run Kafka in KRaft mode (<code>apache/kafka</code> image) and bridge central MQTT → Kafka topic <code>plant.telemetry</code> keyed by asset.</li><li>Write a Kafka Streams/Flink job computing 1-minute rolling averages and alarm events to <code>plant.alarms</code>.</li><li>Monitor consumer lag (Kafka UI / Redpanda Console).</li></ol>`},
resources:[{name:"Apache Kafka documentation & quickstart",url:"https://kafka.apache.org/quickstart"},{name:"Confluent Developer – free Kafka courses",url:"https://developer.confluent.io/courses/"},{name:"EMQX documentation",url:"https://docs.emqx.com/"},{name:"HiveMQ Community Edition",url:"https://github.com/hivemq/hivemq-community-edition"},{name:"Apache Flink",url:"https://flink.apache.org/"},{name:"NATS",url:"https://nats.io/"}],
quiz:[
{q:"Which system provides a durable, replayable log with consumer offsets?",options:["Mosquitto","Apache Kafka","Modbus","OPC UA Server"],a:1,why:"Kafka persists records in partitions."},
{q:"To preserve per-asset ordering in Kafka you should…",options:["Use random keys","Key messages by asset id","Use one consumer per message","Disable replication"],a:1,why:"Same key → same partition → ordered."},
{q:"A compacted Kafka topic keeps…",options:["Only the latest value per key","Nothing","Only the first message","Random samples"],a:0,why:"Log compaction retains the latest record per key."},
{q:"MQTT 5 shared subscriptions allow…",options:["Load balancing messages among a group of subscribers","Sharing passwords","Encryption","Retained messages"],a:0,why:"$share/group/topic distributes messages."},
{q:"Which is an MQTT broker built in Erlang for massive scale?",options:["EMQX","Kafka","InfluxDB","K3s"],a:0,why:"EMQX is Erlang/OTP-based."}
]},

{
id:"cloud", phase:"Phase 7 · Cloud & Intelligence", icon:"☁", title:"Cloud Integration & Digital Twins", hours:20, level:"Advanced",
summary:"Connect plants to cloud IoT platforms for fleet-wide analytics, data lakes, digital twins and ML – with AWS, Azure and open alternatives – while controlling cost and security.",
objectives:["Use AWS IoT Core/SiteWise and Azure IoT Hub/Event Hubs","Provision devices with X.509 and device twins/shadows","Build data lake/lakehouse pipelines","Understand digital twins and the Asset Administration Shell"],
lessons:[
{title:"Cloud IoT services",html:`<table><tr><th>Capability</th><th>AWS</th><th>Azure</th><th>Open/other</th></tr><tr><td>Device connectivity</td><td>IoT Core (MQTT)</td><td>IoT Hub, Event Grid MQTT broker</td><td>EMQX/HiveMQ Cloud, Eclipse Hono</td></tr><tr><td>Industrial modelling</td><td>IoT SiteWise</td><td>Azure IoT Operations, Digital Twins (DTDL)</td><td>Eclipse Ditto, BaSyx</td></tr><tr><td>Edge runtime</td><td>Greengrass v2</td><td>IoT Edge / Arc-enabled K8s</td><td>K3s + Flux</td></tr><tr><td>Streaming</td><td>Kinesis, MSK</td><td>Event Hubs (Kafka API), Stream Analytics</td><td>Kafka, Flink</td></tr><tr><td>Storage/analytics</td><td>S3, Timestream, Athena</td><td>ADLS, Data Explorer (ADX), Fabric</td><td>MinIO, Iceberg, Trino</td></tr></table><p>Google Cloud IoT Core was retired in 2023 – partner brokers + Pub/Sub are used instead. Siemens Insights Hub (MindSphere), PTC ThingWorx, Cognite Data Fusion are industrial SaaS options.</p>`},
{title:"Device identity & provisioning",html:`<p>Each device gets a unique identity: X.509 certificates (ideally key in TPM/secure element), fleet/just-in-time provisioning (AWS JITP, Azure DPS). <b>Device shadows/twins</b> hold desired vs reported state for configuration. Policies restrict each device to its own topics.</p><pre># AWS IoT Core publish with mosquitto
mosquitto_pub --cafile AmazonRootCA1.pem --cert gw.crt --key gw.key \
  -h xxxx-ats.iot.eu-central-1.amazonaws.com -p 8883 -t plant/berlin/telemetry -m '{"t":72.4}'</pre>`},
{title:"Lakehouse & analytics",html:`<p>Bronze (raw) → Silver (cleaned, contextualised) → Gold (KPIs) layers on object storage with open table formats (Apache Iceberg, Delta Lake, Parquet). Tools: Databricks, Snowflake, Microsoft Fabric, Spark, dbt. Join sensor data with ERP/MES (from the mainframe!) for cost per unit, energy per product, quality root-cause.</p>`},
{title:"Digital twins & AAS",html:`<p>A <b>digital twin</b> is a virtual representation of an asset/process synchronised with real data – descriptive (state), predictive (simulation/ML), prescriptive. The <b>Asset Administration Shell</b> (IEC 63278, IDTA) is Industry 4.0's standard twin: submodels like Nameplate, Technical Data, Time Series, Carbon Footprint – foundation for Catena-X/Manufacturing-X data spaces and the EU Digital Product Passport. Open source: Eclipse BaSyx, AASX Package Explorer. Azure Digital Twins uses DTDL; NVIDIA Omniverse/OpenUSD for 3D twins.</p>`},
{title:"Cost & architecture decisions",html:`<p>Message-based pricing punishes chatty devices – aggregate at the edge. Consider egress costs, data residency (GDPR), vendor lock-in (prefer open protocols: MQTT, OPC UA, Parquet), hybrid/on-prem for plants with strict OT policies.</p>`}
],
lab:{title:"Lab: Plant-to-cloud",html:`<ol><li>Create an AWS (free tier) or Azure (free account) IoT thing/device with X.509 certificate.</li><li>Bridge your central MQTT broker to the cloud broker, forwarding only aggregated topics.</li><li>Route data to object storage (S3/ADLS) as Parquet or to Timestream/ADX.</li><li>Create an AAS for your simulated filler machine with Nameplate and TimeSeries submodels using Eclipse BaSyx (Docker).</li><li>Document monthly cost estimate for 100 machines.</li></ol>`},
resources:[{name:"AWS IoT Core developer guide",url:"https://docs.aws.amazon.com/iot/"},{name:"AWS IoT SiteWise",url:"https://docs.aws.amazon.com/iot-sitewise/"},{name:"Azure IoT documentation",url:"https://learn.microsoft.com/azure/iot/"},{name:"Microsoft Learn – Azure IoT learning paths",url:"https://learn.microsoft.com/training/browse/?terms=iot"},{name:"IDTA – Asset Administration Shell",url:"https://industrialdigitaltwin.org/"},{name:"Eclipse BaSyx",url:"https://eclipse.dev/basyx/"},{name:"Eclipse Ditto",url:"https://eclipse.dev/ditto/"}],
quiz:[
{q:"Which standard defines the Industry 4.0 Asset Administration Shell?",options:["IEC 63278","IEC 62541","ISO 9001","IEEE 802.15.4"],a:0,why:"AAS is standardised as IEC 63278."},
{q:"A device shadow/twin stores…",options:["Firmware binaries","Desired and reported state","Only logs","User passwords"],a:1,why:"Used for config sync with intermittently connected devices."},
{q:"Why aggregate at the edge before cloud?",options:["Clouds prohibit raw data","Reduce message and egress costs","Increase latency","Required by MQTT"],a:1,why:"Cloud pricing is per message/volume."},
{q:"In a medallion architecture, the 'Gold' layer contains…",options:["Raw data","Business-level KPIs/aggregates","Backups","Logs"],a:1,why:"Bronze raw, Silver cleaned, Gold business-ready."},
{q:"Recommended device identity mechanism for production fleets is…",options:["Shared password","Unique X.509 certificates, ideally in hardware","No authentication","IP whitelisting only"],a:1,why:"Per-device certificates with secure key storage."}
]},

{
id:"security", phase:"Phase 7 · Cloud & Intelligence", icon:"🛡", title:"Industrial Cybersecurity (IEC 62443)", hours:18, level:"Advanced",
summary:"Connecting OT exposes critical infrastructure. Learn OT threat landscape, IEC 62443 zones & conduits, secure architecture, and regulations like NIS2 and the Cyber Resilience Act.",
objectives:["Describe major OT incidents and attack techniques (MITRE ATT&CK for ICS)","Apply IEC 62443 zones, conduits and security levels","Implement segmentation, DMZ, PKI, least privilege","Know NIS2, CRA, NIST SP 800-82 requirements"],
lessons:[
{title:"Threat landscape",html:`<p>Landmark incidents: <b>Stuxnet</b> (2010, PLC sabotage), Ukraine grid attacks (2015/16, Industroyer), <b>TRITON</b> (2017, targeted safety systems), NotPetya (2017, Maersk/Merck), Colonial Pipeline ransomware (2021), PIPEDREAM/Incontroller toolkit (2022). Legacy protocols (Modbus, S7, DNP3) have no authentication – anyone on the network can write registers. Use the <b>MITRE ATT&amp;CK for ICS</b> matrix to reason about tactics.</p>`},
{title:"IEC 62443",html:`<ul><li>Series parts: 2-x (asset owner policies), 3-2 (risk assessment, <b>zones & conduits</b>), 3-3 (system requirements, Security Levels SL 1–4), 4-1 (secure development lifecycle for vendors), 4-2 (component requirements)</li><li><b>Zones</b> group assets with equal security needs; <b>conduits</b> are controlled communication paths between them</li><li>7 Foundational Requirements: identification & authentication, use control, system integrity, data confidentiality, restricted data flow, timely response to events, resource availability</li></ul>`},
{title:"Secure IIoT architecture",html:`<ul><li>Segmentation per Purdue/zones, industrial DMZ (Level 3.5), firewalls with protocol-aware DPI, data diodes for one-way flows</li><li><b>Outbound-only</b> connections from edge (MQTT over TLS) – no inbound ports into OT</li><li>PKI for OPC UA/MQTT certificates, rotation, revocation</li><li>Secure boot, signed firmware/images, SBOMs, patch management with change control</li><li>Least privilege, MFA, secure remote access (jump hosts, zero-trust), passive OT monitoring (Zeek, Malcolm, Claroty/Nozomi/Dragos)</li><li>Backups and incident response plans aligned with safety</li></ul>`},
{title:"Regulation",html:`<p>EU <b>NIS2</b> directive (since Oct 2024) for essential/important entities incl. manufacturing; EU <b>Cyber Resilience Act</b> (security requirements for products with digital elements, vulnerability handling, SBOM); NIST SP 800-82r3 (OT security guide), NIST CSF 2.0; US CISA ICS advisories; ISA/IEC 62443 certifications (ISA Cybersecurity Fundamentals Specialist) are strong CV items.</p>`}
],
lab:{title:"Lab: Harden your stack",html:`<ol><li>Draw zones & conduits for your project architecture.</li><li>Enable TLS + client certificates on the MQTT broker, ACLs per client; SignAndEncrypt on OPC UA.</li><li>Demonstrate the risk: write a Modbus coil from an unauthorised client, then block it with a firewall rule/segmented Docker network.</li><li>Generate an SBOM (Syft) and scan with Trivy; document findings in a security README.</li><li>Explore ICS traffic with Malcolm or Zeek on your captures.</li></ol>`},
resources:[{name:"ISA/IEC 62443 series overview",url:"https://www.isa.org/standards-and-publications/isa-standards/isa-iec-62443-series-of-standards"},{name:"MITRE ATT&CK for ICS",url:"https://attack.mitre.org/matrices/ics/"},{name:"NIST SP 800-82 Rev.3",url:"https://csrc.nist.gov/pubs/sp/800/82/r3/final"},{name:"CISA ICS training (free virtual courses)",url:"https://www.cisa.gov/ics-training-available-through-cisa"},{name:"SANS ICS resources",url:"https://www.sans.org/industrial-control-systems-security/"},{name:"Malcolm network analysis (CISA/INL)",url:"https://github.com/cisagov/Malcolm"}],
quiz:[
{q:"In IEC 62443, a controlled communication path between zones is a…",options:["Conduit","Tunnel","Bridge","Pipe"],a:0,why:"Zones & conduits model."},
{q:"Which malware specifically targeted Safety Instrumented Systems?",options:["WannaCry","TRITON/TRISIS","Mirai","ILOVEYOU"],a:1,why:"TRITON attacked Schneider Triconex SIS."},
{q:"Best practice for edge-to-cloud connectivity is…",options:["Open inbound ports to PLCs","Outbound-only TLS connections from the edge","Disable firewalls","Use Telnet"],a:1,why:"No inbound attack surface into OT."},
{q:"Why is Modbus TCP risky on flat networks?",options:["It is too slow","It has no authentication or encryption","It uses UDP","It needs a cloud"],a:1,why:"Any host can read/write registers."},
{q:"Which EU regulation mandates security requirements and SBOMs for products with digital elements?",options:["GDPR","Cyber Resilience Act","REACH","RoHS"],a:1,why:"The CRA."}
]},

{
id:"analytics", phase:"Phase 7 · Cloud & Intelligence", icon:"🤖", title:"Industrial Analytics, AI & Predictive Maintenance", hours:22, level:"Advanced",
summary:"Turn data into value: KPIs like OEE, signal processing, anomaly detection, predictive maintenance, computer vision, and MLOps at the edge – plus generative AI for operations.",
objectives:["Compute OEE and other manufacturing KPIs","Apply FFT and feature extraction to vibration data","Train anomaly detection and RUL models","Deploy models to the edge (ONNX/TFLite) and monitor drift"],
lessons:[
{title:"KPIs",html:`<p><b>OEE</b> = Availability (run time / planned time) × Performance (ideal cycle × count / run time) × Quality (good / total). World-class ≈ 85 %. Others: MTBF, MTTR, first-pass yield, energy per unit (kWh/part), scrap rate, throughput. Use PackML states and counters from your UNS to compute OEE in real time.</p>`},
{title:"Signal processing",html:`<p>Python stack: pandas, NumPy, SciPy, scikit-learn. Vibration analysis: FFT spectrum, RMS, peak, kurtosis, crest factor; bearing fault frequencies (BPFO, BPFI); envelope analysis. Resampling, filtering (Butterworth), rolling windows.</p><pre>import numpy as np
x = signal - signal.mean()
spec = np.abs(np.fft.rfft(x * np.hanning(len(x))))
freqs = np.fft.rfftfreq(len(x), d=1/fs)
rms = np.sqrt(np.mean(x**2)); kurt = ((x/x.std())**4).mean()</pre>`},
{title:"Machine learning",html:`<ul><li><b>Anomaly detection</b>: z-score/EWMA, Isolation Forest, autoencoders</li><li><b>Predictive maintenance</b>: classification (fails within N days), <b>Remaining Useful Life</b> regression (NASA C-MAPSS turbofan dataset), survival analysis</li><li><b>Soft sensors</b>: estimate hard-to-measure quality variables</li><li><b>Computer vision</b>: defect detection with YOLO/CNNs on Jetson</li><li>Pitfalls: class imbalance (few failures), data leakage across time, labels from maintenance logs (CMMS) are messy</li></ul>`},
{title:"MLOps & GenAI",html:`<p>Train in cloud (MLflow tracking) → export to <b>ONNX</b>/TFLite → deploy containerised to edge → monitor drift → retrain. Generative AI: LLM copilots over manuals and maintenance logs (RAG), natural-language queries over the UNS, agents generating PLC code drafts (always with human review – safety!).</p>`}
],
lab:{title:"Lab: Predictive maintenance pipeline",html:`<ol><li>Download the NASA C-MAPSS or CWRU bearing dataset (Kaggle mirrors).</li><li>Extract features (RMS, kurtosis, FFT band energy) and train an Isolation Forest and a RUL regressor (scikit-learn/XGBoost).</li><li>Export to ONNX, serve via a small Python/Java container subscribing to the UNS.</li><li>Publish anomaly scores back to <code>.../asset/health</code> and visualise in Grafana.</li><li>Implement real-time OEE from your simulated machine states.</li></ol>`},
resources:[{name:"Kaggle Learn – Python, pandas, ML (free)",url:"https://www.kaggle.com/learn"},{name:"scikit-learn user guide",url:"https://scikit-learn.org/stable/user_guide.html"},{name:"CWRU Bearing Data Center",url:"https://engineering.case.edu/bearingdatacenter"},{name:"ONNX Runtime",url:"https://onnxruntime.ai/"},{name:"MLflow",url:"https://mlflow.org/"},{name:"OEE.com – OEE fundamentals",url:"https://www.oee.com/"}],
quiz:[
{q:"Availability 90%, Performance 95%, Quality 99% → OEE ≈",options:["84.6%","95%","90%","284%"],a:0,why:"0.90 × 0.95 × 0.99 ≈ 0.846."},
{q:"Which transform reveals frequency components of vibration?",options:["FFT","SHA-256","Base64","JSON"],a:0,why:"Fast Fourier Transform."},
{q:"RUL stands for…",options:["Remaining Useful Life","Real Unit Load","Remote Update Link","Rated Upper Limit"],a:0,why:"Prediction of time to failure."},
{q:"Which format allows portable deployment of trained models to edge runtimes?",options:["ONNX","CSV","JCL","PDF"],a:0,why:"Open Neural Network Exchange."},
{q:"A key pitfall in predictive maintenance datasets is…",options:["Too many failures","Severe class imbalance (few failures)","Too little data always","No timestamps ever"],a:1,why:"Failures are rare events."}
]},

{
id:"capstone", phase:"Phase 8 · Capstone & Career", icon:"🎓", title:"Capstone Project & Profile Launch", hours:60, level:"Expert",
summary:"Integrate everything into an end-to-end, portfolio-grade Smart Factory platform, then launch your professional IIoT profile: portfolio, certifications, community, CV and interview preparation.",
objectives:["Deliver an end-to-end IIoT reference implementation","Document architecture, security and decisions professionally","Earn targeted certifications and badges","Build a visible profile and prepare for IIoT interviews"],
lessons:[
{title:"Capstone: 'Smart Factory in a Box'",html:`<p>Build a reproducible, one-command (<code>docker compose up</code> / Helm) platform:</p><ol><li><b>Field</b>: CODESYS/OpenPLC soft PLC + Python/Java sensor simulators (Modbus TCP, OPC UA) modelling a bottling line with PackML states, faults and degrading bearing</li><li><b>Edge</b>: Java gateway (Milo + PLC4X + HiveMQ client) and/or Node-RED – normalisation, contextualisation, store-and-forward, Sparkplug B edge node</li><li><b>UNS</b>: clustered MQTT broker with ISA-95 namespace; bridge to Kafka</li><li><b>Data</b>: Telegraf → InfluxDB/Timescale, retention & downsampling; Grafana dashboards (OEE, states, alarms)</li><li><b>Intelligence</b>: anomaly/RUL model (ONNX) at the edge publishing asset health</li><li><b>Enterprise</b>: completed production orders → IBM MQ → (Z Xplore) JCL batch with PL/I program producing a daily production report; or z/OS Connect API</li><li><b>Cloud</b>: aggregated data to AWS/Azure + AAS digital twin in BaSyx</li><li><b>Security</b>: TLS everywhere, certificates, ACLs, zones/conduits diagram, SBOM & scan report</li><li><b>Ops</b>: CI/CD (GitHub Actions) building multi-arch images, K3s deployment with GitOps</li></ol>`},
{title:"Documentation that gets you hired",html:`<ul><li>README with architecture diagram (C4/Purdue), demo GIF/video (3–5 min), quick start</li><li>Architecture Decision Records (why Sparkplug, why Timescale…)</li><li>Security & threat model document (IEC 62443 language)</li><li>Performance test results (msgs/sec, latency, resource usage on a Raspberry Pi)</li><li>Lessons learned blog post series</li></ul>`},
{title:"Certifications & badges (pick by target role)",html:`<table><tr><th>Area</th><th>Options</th></tr><tr><td>Java</td><td>Oracle Certified Professional: Java SE 17/21 Developer</td></tr><tr><td>Mainframe</td><td>IBM Z Xplore badges (Fundamentals/Concepts/Advanced), IBM z/OS Mainframe Practitioner, IBM MQ badges</td></tr><tr><td>OT/protocols</td><td>OPC Foundation certified training, HiveMQ MQTT/Sparkplug certifications, Inductive Automation Ignition Core/Gold, Siemens/Rockwell PLC courses</td></tr><tr><td>Cloud</td><td>AWS Certified Solutions Architect / IoT specialty learning, Microsoft Azure IoT Developer (AZ-220 retired – use Azure Developer + IoT Operations learning paths)</td></tr><tr><td>Containers</td><td>CKAD, Linux Foundation LFS courses (K3s/edge)</td></tr><tr><td>Security</td><td>ISA/IEC 62443 Cybersecurity Fundamentals Specialist, GICSP (GIAC)</td></tr><tr><td>Data</td><td>Confluent Kafka Developer, Databricks Data Engineer Associate</td></tr></table>`},
{title:"Profile launch",html:`<ul><li><b>GitHub</b>: pinned capstone + module repos, clean commits, CI badges</li><li><b>LinkedIn</b>: headline e.g. "IIoT Engineer | OPC UA · MQTT/Sparkplug · Java · z/OS integration"; feature the demo video; post weekly learnings</li><li><b>CV</b>: quantified projects ("ingested 20k msgs/s from 50 simulated machines with &lt;200 ms end-to-end latency")</li><li><b>Community</b>: IIoT World, Industry 4.0 Discord/communities (4.0 Solutions, IIoT University), Eclipse IoT & Sparkplug WG, OPC Foundation events, Hannover Messe, ProveIt! conference, local Node-RED/Kafka meetups; contribute to open source (Milo, Tahu, open62541, Node-RED nodes)</li><li><b>Interview prep</b>: system design ("design a UNS for 20 plants"), protocol deep-dives (QoS, Sparkplug state, OPC UA subscriptions), Purdue/62443 security, coding (Java concurrency, parsing bytes), mainframe basics (JCL abends, datasets), behavioural STAR stories</li><li><b>Target employers</b>: automation vendors (Siemens, Rockwell, Schneider, ABB, Bosch Rexroth), system integrators, IIoT platform vendors (HiveMQ, Litmus, HighByte, Cognite), cloud providers, manufacturers' digital teams, IBM Z ecosystem consultancies</li></ul>`},
{title:"Continuous growth roadmap",html:`<p>After landing a role: specialise (OT security, industrial data architecture, edge AI, mainframe modernisation), learn TSN & 5G for industry, IEC 61499, OPC UA FX, Manufacturing-X/Catena-X data spaces, and sustainability analytics (Scope 1–3 emissions, Digital Product Passport).</p>`}
],
lab:{title:"Capstone milestones & checklist",html:`<ol><li>Week 1–2: architecture, repo, simulators & soft PLC</li><li>Week 3: edge gateway + Sparkplug + UNS</li><li>Week 4: Kafka, time-series, Grafana</li><li>Week 5: analytics model, mainframe integration, cloud & AAS</li><li>Week 6: security hardening, CI/CD, K3s, documentation, demo video, LinkedIn launch post</li></ol><p>✅ Definition of done: one-command start, all data flows visible end-to-end, security documented, recorded demo, published article.</p>`},
resources:[{name:"IBM Z Xplore badges",url:"https://www.ibm.com/z/resources/zxplore"},{name:"Oracle Java certification",url:"https://education.oracle.com/java/pFamily_48"},{name:"HiveMQ Academy",url:"https://www.hivemq.com/academy/"},{name:"Inductive University",url:"https://inductiveuniversity.com/"},{name:"ISA 62443 certificate programs",url:"https://www.isa.org/certification/certificate-programs/isa-iec-62443-cybersecurity-certificate-program"},{name:"Linux Foundation Training (CKAD)",url:"https://training.linuxfoundation.org/"},{name:"GitHub Actions docs",url:"https://docs.github.com/actions"},{name:"Eclipse IoT working group",url:"https://iot.eclipse.org/"}],
quiz:[
{q:"Which best demonstrates IIoT competence to employers?",options:["A list of watched videos","A documented, reproducible end-to-end project with demo","Only certificates","A long CV"],a:1,why:"Evidence of integration skills across IT/OT is most compelling."},
{q:"Architecture Decision Records document…",options:["Meeting minutes","Why key technical choices were made","Bug reports","Salary details"],a:1,why:"ADRs capture context, decision and consequences."},
{q:"In the capstone, how should completed production orders reach the mainframe?",options:["Email","Reliable messaging such as IBM MQ or a z/OS Connect API","Manual typing","Modbus"],a:1,why:"Guaranteed-delivery messaging/APIs are standard."},
{q:"A strong quantified CV bullet is…",options:["'Worked with MQTT'","'Ingested 20k msgs/s from 50 machines with <200 ms latency'","'Know many tools'","'Team player'"],a:1,why:"Specific, measurable outcomes."},
{q:"Which certification aligns with OT cybersecurity?",options:["ISA/IEC 62443 Cybersecurity Fundamentals Specialist","Scrum Master","PMP","Six Sigma Yellow Belt"],a:0,why:"62443 is the core OT security standard."}
]}
];

