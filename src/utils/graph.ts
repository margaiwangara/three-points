class Graph {
  nodes: any[];

  adjacencyList: object;
  constructor() {
    this.nodes = [];
    this.adjacencyList = {};
  }

  addNode(node: any){
    this.nodes.push(node);
    this.adjacencyList[node] = [];
  }

  addEdge(node1: any, node2: any, weight: number){
    this.adjacencyList[node1].push({ node: node2, weight });
    this.adjacencyList[node2].push({ node: node1, weight })
  }
}
