class OpBuilder {
  constructor() {}
  async opDataFetch() {
    try {
      const rawOpData = await fetch("http://localhost:3500/api/v1/operations");
      const opData = await rawOpData.json();
      return opData;
    } catch (error) {
      console.log(error);
    }
  }
}

export default OpBuilder;
