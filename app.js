const NS = "http://www.w3.org/2000/svg";
const COURSE = "https://www.youtube.com/watch?v=jGg_1h0qzaM&t=";
const GRAPH_SOURCE = "https://github.com/iamvaibhavmehra/LangGraph-Course-freeCodeCamp/blob/main/Graphs/";

const layouts = {
  single: {
    nodes: [
      { id: "start", label: "START", x: 85, y: 170, w: 100, h: 52, terminal: true },
      { id: "work", label: "greeter", x: 400, y: 170, w: 158, h: 66 },
      { id: "end", label: "END", x: 715, y: 170, w: 100, h: 52, terminal: true },
    ],
    edges: [
      { id: "enter", d: "M135 170 H321" },
      { id: "finish", d: "M479 170 H665" },
    ],
  },
  sequence: {
    nodes: [
      { id: "start", label: "START", x: 70, y: 170, w: 100, h: 52, terminal: true },
      { id: "first", label: "first_node", x: 285, y: 170, w: 160, h: 66 },
      { id: "second", label: "second_node", x: 520, y: 170, w: 170, h: 66 },
      { id: "end", label: "END", x: 735, y: 170, w: 100, h: 52, terminal: true },
    ],
    edges: [
      { id: "enter", d: "M120 170 H205" },
      { id: "continue", d: "M365 170 H435" },
      { id: "finish", d: "M605 170 H685" },
    ],
  },
  branch: {
    nodes: [
      { id: "start", label: "START", x: 80, y: 170, w: 100, h: 52, terminal: true },
      { id: "router", label: "router", x: 275, y: 170, w: 156, h: 66 },
      { id: "add", label: "add_node", x: 535, y: 82, w: 150, h: 66 },
      { id: "subtract", label: "subtract_node", x: 535, y: 258, w: 174, h: 66 },
      { id: "end", label: "END", x: 735, y: 170, w: 100, h: 52, terminal: true },
    ],
    edges: [
      { id: "enter", d: "M130 170 H197" },
      { id: "to-add", d: "M353 151 C411 151 395 82 460 82", label: "+", lx: 405, ly: 111 },
      { id: "to-subtract", d: "M353 189 C411 189 390 258 448 258", label: "−", lx: 404, ly: 239 },
      { id: "add-end", d: "M610 82 C666 82 660 154 685 154" },
      { id: "subtract-end", d: "M622 258 C667 258 659 186 685 186" },
    ],
  },
  loop: {
    nodes: [
      { id: "start", label: "START", x: 78, y: 180, w: 100, h: 52, terminal: true },
      { id: "greeting", label: "greeting", x: 282, y: 180, w: 150, h: 66 },
      { id: "random", label: "random", x: 520, y: 180, w: 150, h: 66 },
      { id: "end", label: "END", x: 730, y: 180, w: 100, h: 52, terminal: true },
    ],
    edges: [
      { id: "enter", d: "M128 180 H207" },
      { id: "to-random", d: "M357 180 H445" },
      { id: "repeat", d: "M520 147 C520 57 636 57 636 147", label: "counter < 5", lx: 566, ly: 74 },
      { id: "exit", d: "M595 180 H680", label: "counter = 5", lx: 601, ly: 215 },
    ],
  },
};

const graphs = {
  "graph-1": {
    number: "01", shape: "SINGLE NODE", title: "Hello World",
    summary: "The smallest possible LangGraph flow: read state, update it once, then finish.",
    caption: "START → greeter → END",
    takeaway: "A node is a Python function. The graph determines when it runs.",
    video: `${COURSE}1119s`, source: `${GRAPH_SOURCE}Hello_Word.ipynb`, layout: "single",
    steps: [
      { node: "start", edge: null, label: "INPUT", title: "The graph receives a message", explanation: "State begins with a single field. The greeter will read it.", state: { message: "Mina" } },
      { node: "work", edge: "enter", label: "GREETER NODE", title: "The node updates the message", explanation: "The node uses the input name to create a greeting and returns the updated state.", state: { message: "Hey Mina, how is your day going?" } },
      { node: "end", edge: "finish", label: "OUTPUT", title: "The graph finishes", explanation: "There are no more nodes. The final state is returned to the caller.", state: { message: "Hey Mina, how is your day going?" } },
    ],
  },
  "graph-2": {
    number: "02", shape: "SINGLE NODE · RICHER STATE", title: "Multiple inputs",
    summary: "The flow stays simple while state carries a name, a list of values, and a result.",
    caption: "START → processor → END",
    takeaway: "More input fields do not require more graph nodes. One node can read several values and update one result.",
    video: `${COURSE}1987s`, source: `${GRAPH_SOURCE}Multiple_Inputs.ipynb`, layout: "single",
    nodeLabels: { work: "processor" },
    steps: [
      { node: "start", edge: null, label: "INPUT", title: "Several fields enter together", explanation: "The state schema describes the name, integer list, and result field.", state: { name: "Mina", values: [1, 2, 3, 4], result: "" } },
      { node: "work", edge: "enter", label: "PROCESSOR NODE", title: "The node reads two inputs", explanation: "It sums the list and combines the total with the name.", state: { name: "Mina", values: [1, 2, 3, 4], result: "Hi there Mina! Your sum = 10" } },
      { node: "end", edge: "finish", label: "OUTPUT", title: "The result is returned", explanation: "The input fields remain available alongside the computed result.", state: { name: "Mina", values: [1, 2, 3, 4], result: "Hi there Mina! Your sum = 10" } },
    ],
  },
  "graph-3": {
    number: "03", shape: "SEQUENCE", title: "Sequential",
    summary: "Two nodes run in a fixed order. The second builds on the first node’s output.",
    caption: "START → first_node → second_node → END",
    takeaway: "A normal edge fixes the order. Later nodes can read and extend earlier state updates.",
    video: `${COURSE}2669s`, source: `${GRAPH_SOURCE}Sequential_Agent.ipynb`, layout: "sequence",
    steps: [
      { node: "start", edge: null, label: "INPUT", title: "The state starts with two facts", explanation: "The name and age are inputs. The final sentence is still empty.", state: { name: "Mina", age: "31", final: "" } },
      { node: "first", edge: "enter", label: "FIRST NODE", title: "Create the greeting", explanation: "The first node writes the opening text to final.", state: { name: "Mina", age: "31", final: "Hi Mina!" } },
      { node: "second", edge: "continue", label: "SECOND NODE", title: "Append the age", explanation: "The second node reads final and adds another sentence. Replacing it would lose the greeting.", state: { name: "Mina", age: "31", final: "Hi Mina! You are 31 years old!" } },
      { node: "end", edge: "finish", label: "OUTPUT", title: "Both node updates are visible", explanation: "The graph returns the combined final text.", state: { name: "Mina", age: "31", final: "Hi Mina! You are 31 years old!" } },
    ],
  },
  "graph-4": {
    number: "04", shape: "CONDITIONAL BRANCH", title: "Conditional",
    summary: "A routing function checks the operation and sends state to one of two calculation nodes.",
    caption: "START → router → add_node OR subtract_node → END",
    takeaway: "The router is a node. A separate function returns a route label, and the path map selects the destination.",
    video: `${COURSE}3336s`, source: `${GRAPH_SOURCE}Conditional_Agent.ipynb`, layout: "branch",
    stepsFor(operation) {
      const add = operation === "+";
      const result = add ? 15 : 5;
      const state = (finalNumber) => ({ number1: 10, operation, number2: 5, finalNumber });
      return [
        { node: "start", edge: null, label: "INPUT", title: "The operation is part of state", explanation: "Change the route below to compare the two possible executions.", state: state(0) },
        { node: "router", edge: "enter", label: "ROUTER NODE", title: "Pass through the state", explanation: "This named node does no arithmetic. Its outgoing conditional edge will choose the path.", state: state(0) },
        { node: add ? "add" : "subtract", edge: add ? "to-add" : "to-subtract", label: "ROUTING DECISION", title: add ? "Addition path selected" : "Subtraction path selected", explanation: add ? "The route label addition_operation maps to add_node. Subtract does not run." : "The route label subtraction_operation maps to subtract_node. Add does not run.", state: state(result) },
        { node: "end", edge: add ? "add-end" : "subtract-end", label: "OUTPUT", title: `finalNumber is ${result}`, explanation: "Only the selected operation node updated the result before the graph ended.", state: state(result) },
      ];
    },
  },
  "graph-5": {
    number: "05", shape: "LOOP", title: "Looping",
    summary: "A conditional edge returns to the random node until five numbers have been generated.",
    caption: "START → greeting → random ↺ → END",
    takeaway: "The condition runs after random. Counter values 1–4 loop back; counter 5 exits.",
    video: `${COURSE}4454s`, source: `${GRAPH_SOURCE}Looping.ipynb`, layout: "loop",
    steps: (() => {
      const draws = [3, 8, 1, 6, 4]; // Illustrative values; the course uses random numbers.
      const steps = [
        { node: "start", edge: null, label: "INPUT", title: "Start with an empty list", explanation: "The list of numbers and counter are the loop’s memory.", state: { name: "Mina", number: [], counter: 0 } },
        { node: "greeting", edge: "enter", label: "GREETING NODE", title: "Greet once and set counter to zero", explanation: "After this, the fixed edge moves to random. The greeting node will not repeat.", state: { name: "Hi there, Mina", number: [], counter: 0 } },
      ];
      draws.forEach((value, index) => {
        const counter = index + 1;
        steps.push({
          node: "random", edge: index === 0 ? "to-random" : "repeat", label: `RANDOM NODE · PASS ${counter}`,
          title: counter === 5 ? "The fifth draw completes the loop" : `Draw ${counter}: the loop continues`,
          explanation: counter === 5 ? "Counter is now 5, so should_continue returns exit. The next step is END." : `An example draw adds ${value} to the list. Counter is ${counter}, still below 5, so the route returns to random.`,
          state: { name: "Hi there, Mina", number: draws.slice(0, counter), counter },
        });
      });
      steps.push({ node: "end", edge: "exit", label: "OUTPUT", title: "Five numbers, then stop", explanation: "The fifth counter check chooses exit instead of loop. The shown draws are illustrative.", state: { name: "Hi there, Mina", number: draws, counter: 5 } });
      return steps;
    })(),
  },
};

const ui = {
  tabs: Array.from(document.querySelectorAll(".lab-tab")),
  panel: document.getElementById("graph-panel"),
  eyebrow: document.getElementById("graph-eyebrow"),
  title: document.getElementById("graph-title"),
  summary: document.getElementById("graph-summary"),
  video: document.getElementById("graph-video"),
  source: document.getElementById("graph-source"),
  caption: document.getElementById("diagram-caption"),
  takeaway: document.getElementById("graph-takeaway"),
  svg: document.getElementById("graph-svg"),
  routeSelector: document.getElementById("route-selector"),
  routeButtons: Array.from(document.querySelectorAll(".route-button")),
  stepCounter: document.getElementById("step-counter"),
  stepNode: document.getElementById("step-node"),
  stepTitle: document.getElementById("step-title"),
  stepExplanation: document.getElementById("step-explanation"),
  stateJson: document.getElementById("state-json"),
  previous: document.getElementById("previous-step"),
  next: document.getElementById("next-step"),
  dots: document.getElementById("step-dots"),
};

let selectedGraph = "graph-1";
let selectedOperation = "-";
let stepIndex = 0;

function svgElement(name, attributes = {}) {
  const element = document.createElementNS(NS, name);
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, String(value)));
  return element;
}

function getSteps() {
  const graph = graphs[selectedGraph];
  return graph.stepsFor ? graph.stepsFor(selectedOperation) : graph.steps;
}

function renderDiagram(step) {
  const graph = graphs[selectedGraph];
  const layout = layouts[graph.layout];
  const svg = ui.svg;
  svg.replaceChildren();
  svg.setAttribute("aria-label", `${graph.title} graph. Current step: ${step.title}.`);

  const defs = svgElement("defs");
  const marker = svgElement("marker", { id: "graph-arrow", viewBox: "0 0 10 10", refX: "9", refY: "5", markerWidth: "7", markerHeight: "7", orient: "auto-start-reverse" });
  marker.appendChild(svgElement("path", { d: "M 0 0 L 10 5 L 0 10 z", fill: "#9bb99a" }));
  defs.appendChild(marker);
  svg.appendChild(defs);

  layout.edges.forEach((edge) => {
    const path = svgElement("path", { d: edge.d, "marker-end": "url(#graph-arrow)" });
    path.classList.add("graph-edge");
    if (edge.id === step.edge) path.classList.add("is-active");
    if (graph.layout === "branch" && ((selectedOperation === "+" && ["to-subtract", "subtract-end"].includes(edge.id)) || (selectedOperation === "-" && ["to-add", "add-end"].includes(edge.id)))) path.classList.add("is-muted");
    svg.appendChild(path);
    if (edge.label) {
      const label = svgElement("text", { x: edge.lx, y: edge.ly, class: "graph-edge-label" });
      label.textContent = edge.label;
      svg.appendChild(label);
    }
  });

  layout.nodes.forEach((node) => {
    const group = svgElement("g", { class: "graph-node" });
    if (node.terminal) group.classList.add("is-terminal");
    if (node.id === step.node) group.classList.add("is-active");
    if (graph.layout === "branch" && ((selectedOperation === "+" && node.id === "subtract") || (selectedOperation === "-" && node.id === "add"))) group.classList.add("is-muted");
    group.appendChild(svgElement("rect", { x: node.x - node.w / 2, y: node.y - node.h / 2, width: node.w, height: node.h, rx: node.terminal ? 17 : 19 }));
    const text = svgElement("text", { x: node.x, y: node.y + 6, "text-anchor": "middle" });
    text.textContent = graph.nodeLabels?.[node.id] ?? node.label;
    group.appendChild(text);
    svg.appendChild(group);
  });
}

function renderStep() {
  const steps = getSteps();
  stepIndex = Math.max(0, Math.min(stepIndex, steps.length - 1));
  const step = steps[stepIndex];
  ui.stepCounter.textContent = `${String(stepIndex + 1).padStart(2, "0")} / ${String(steps.length).padStart(2, "0")}`;
  ui.stepNode.textContent = step.label;
  ui.stepTitle.textContent = step.title;
  ui.stepExplanation.textContent = step.explanation;
  ui.stateJson.textContent = JSON.stringify(step.state, null, 2);
  ui.previous.disabled = stepIndex === 0;
  ui.next.innerHTML = stepIndex === steps.length - 1 ? 'Restart <span aria-hidden="true">↺</span>' : 'Next state <span aria-hidden="true">→</span>';
  ui.dots.replaceChildren();
  steps.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Go to state ${index + 1}`);
    dot.setAttribute("aria-current", index === stepIndex ? "step" : "false");
    if (index === stepIndex) dot.classList.add("is-active");
    dot.addEventListener("click", () => { stepIndex = index; renderStep(); });
    ui.dots.appendChild(dot);
  });
  renderDiagram(step);
}

function setGraph(id, updateUrl = true) {
  if (!graphs[id]) return;
  selectedGraph = id;
  stepIndex = 0;
  const graph = graphs[id];
  ui.tabs.forEach((tab) => {
    const isSelected = tab.dataset.graph === id;
    tab.classList.toggle("is-selected", isSelected);
    tab.setAttribute("aria-selected", String(isSelected));
    tab.tabIndex = isSelected ? 0 : -1;
    if (isSelected) ui.panel.setAttribute("aria-labelledby", tab.id);
  });
  ui.eyebrow.textContent = `GRAPH ${graph.number} / ${graph.shape}`;
  ui.title.textContent = graph.title;
  ui.summary.textContent = graph.summary;
  ui.video.href = graph.video;
  ui.source.href = graph.source;
  ui.caption.textContent = graph.caption;
  ui.takeaway.textContent = graph.takeaway;
  ui.routeSelector.hidden = id !== "graph-4";
  renderStep();
  if (updateUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set("graph", id);
    url.hash = "lab";
    window.history.replaceState(null, "", url);
  }
}

ui.tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => setGraph(tab.dataset.graph));
  tab.addEventListener("keydown", (event) => {
    let targetIndex = index;
    if (event.key === "ArrowRight") targetIndex = (index + 1) % ui.tabs.length;
    else if (event.key === "ArrowLeft") targetIndex = (index - 1 + ui.tabs.length) % ui.tabs.length;
    else if (event.key === "Home") targetIndex = 0;
    else if (event.key === "End") targetIndex = ui.tabs.length - 1;
    else return;
    event.preventDefault();
    ui.tabs[targetIndex].focus();
    setGraph(ui.tabs[targetIndex].dataset.graph);
  });
});

ui.routeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedOperation = button.dataset.operation;
    ui.routeButtons.forEach((other) => {
      const active = other === button;
      other.classList.toggle("is-active", active);
      other.setAttribute("aria-pressed", String(active));
    });
    stepIndex = 0;
    renderStep();
  });
});

ui.previous.addEventListener("click", () => { if (stepIndex > 0) { stepIndex -= 1; renderStep(); } });
ui.next.addEventListener("click", () => { stepIndex = stepIndex === getSteps().length - 1 ? 0 : stepIndex + 1; renderStep(); });

const initial = new URLSearchParams(window.location.search).get("graph");
setGraph(graphs[initial] ? initial : "graph-1", false);
