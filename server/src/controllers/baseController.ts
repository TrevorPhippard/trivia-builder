export default class Controller {
  model: any;

  constructor(providedModel: any) {
    this.model = providedModel;
  }

  addEntry = (info: any) => {
    return this.model.create(info).then((entry: any) => {
      return entry;
    });
  };

  getAllEntries = async () => {
    return await this.model.findAll();
  };

  getEntryById = async (id: any) => {
    const item = await this.model.findByPk(id);
    if (item == null) {
      return false;
    } else {
      return item;
    }
  };

  getEntryByQuery = async (query: any) => {
    const items = await this.model.findAll(query);
    if (!items) {
      return false;
    } else {
      return items;
    }
  };

  updateEntryById = async (id: any, obj: any) => {
    const item = await this.model.findByPk(id);
    if (item == null) {
      return false;
    } else {
      Object.keys(obj).forEach((key) => {
        item[key] = obj[key];
      });
      await item.save();
      return item;
    }
  };

  updateEntryByQuery = async (query: any, obj: any) => {
    const items = await this.model.findAll(query);
    const item = items[0];
    if (item == null) {
      return false;
    } else {
      Object.keys(obj).forEach((key) => {
        item[key] = obj[key];
      });
      await item.save();
      return item;
    }
  };

  removeEntryById = async (id: any) => {
    const item = await this.model.findByPk(id);
    if (item == null) {
      return false;
    } else {
      await item.destroy();
      return true;
    }
  };

  removeEntryByQuery = async (query: any) => {
    const items = await this.model.findAll(query);
    if (!items.length) {
      return false;
    } else {
      items.forEach(async (item: any) => {
        await item.destroy();
      });
      return { status: 200, message: 'Item deleted successfully' };
    }
  };
}
