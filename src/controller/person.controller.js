import personService from "../service/person.service.js";

const personController = {
  register: async(req, res)=>{

    try {
      const person = req.body;
      if(!person.cliente || !person.produto || !person.valor )
         throw new Error('Dados não conferem');

      const register = await personService.register(person);
      res.send(register);
  
    } catch (error) {
      res.send(error)
    }
  },
  update: async(req, res)=>{

    // if(!req.params.id) throw new Error('id incorreto');
    const update = await personService.update(req)
    res.send(update);

  },
  updatedelivery: async(req, res)=>{

    // if(!req.params.id) throw new Error('id incorreto');
    const update = await personService.updatedelivery(req.params.id)
    res.send(update);

  },
  one: async(req,res)=>{

    if(!req.params.id) throw new Error('sem id')

    const client = await personService.one(req.params.id)
    return res.send(client);
  },

  delete: async(req,res)=>{

    await personService.delete(req.params.id);
    res.send('feito');
  },

  oneClient: async(req,res)=>{
    const client = await personService.oneClient(req.params.client);
    res.send(client.toString());
  },
  totalProduct: async(req,res)=>{

    const total = await personService.totalProduct(req.params.product)
    res.send(total);
  },
  getMaisVendidos: async(req,res)=>{

    const maisVendidos = await personService.getMaisVendidos()
    res.send(maisVendidos);
  }





}
export default personController;