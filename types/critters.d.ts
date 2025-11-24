declare module "critters" {
  type CrittersOptions = Record<string, unknown>;

  export default class Critters {
    constructor(options?: CrittersOptions);
    process(html: string): Promise<string>;
  }
}

