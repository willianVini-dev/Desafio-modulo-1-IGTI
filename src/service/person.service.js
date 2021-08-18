import personRepository from "../repository/person.repository.js";

const personService = {
    
  register: async(person)=>{ return await personRepository.register(person); },

  update: async(info)=>{ return await personRepository.update(info);},

  updatedelivery: async(id)=>{ return await personRepository.updatedelivery(id);},

  one: async(id)=>{ return await personRepository.one(id);},
  
  delete: async(id)=>{ return await personRepository.delete(id);},

  oneClient: async(client)=>{ return await personRepository.oneClient(client)},

  totalProduct: async(product)=>{ return await personRepository.totalProduct(product)},

  getMaisVendidos: async()=>{ return await personRepository.getMaisVendidos()}

}
export default personService;