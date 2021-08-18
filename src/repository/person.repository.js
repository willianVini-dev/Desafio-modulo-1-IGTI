import { Console } from 'console';
import {promises as fs} from 'fs';
const {readFile, writeFile } = fs;

const personRepository = {
  register: async(person)=>{
    const json = JSON.parse(await readFile('pedidos.json'));
    const newPerson = {
      id: json.nextId,
      cliente: person.cliente,
      produto: person.produto,
      valor: person.valor,
      entregue: false,
      timestamp: new Date()
    }
    json.pedidos.push(newPerson)
    json.nextId++;
    await writeFile('pedidos.json', JSON.stringify(json, null,2));
    
    return newPerson;
  },

  update: async(info)=>{
    const json = JSON.parse(await readFile('pedidos.json'));
    const index = json.pedidos.findIndex( pedido => pedido.id === Number(info.params.id));
    json.pedidos[index].cliente = info.body.cliente;
    json.pedidos[index].produto = info.body.produto;
    json.pedidos[index].valor = info.body.valor;

    await writeFile('pedidos.json',JSON.stringify(json,null,2));

    return json.pedidos[index];

  },
  updatedelivery: async(id)=>{

    const json = JSON.parse(await readFile('pedidos.json'));
    const index = json.pedidos.findIndex( pedido => pedido.id === Number(id));

    json.pedidos[index].entregue = true;
    await writeFile('pedidos.json', JSON.stringify(json, null, 2));
    return true;

  },
  one: async(id)=>{
    const json = JSON.parse(await readFile('pedidos.json'));
    return json.pedidos.find(pedido => pedido.id === Number(id));
  },

  delete: async(id)=>{
    const json = JSON.parse(await fs.readFile('pedidos.json'));
    json.pedidos = json.pedidos.filter(pedido => pedido.id !== Number(id));
    await writeFile('pedidos.json',JSON.stringify(json, null, 2));

    return 'deletado';
  },

  oneClient: async(name)=>{
    const json = JSON.parse(await readFile('pedidos.json'));
    const client = json.pedidos = json.pedidos
      .filter(pedido => pedido.cliente === name && pedido.entregue === true)
      .map(res => res.valor);
      const total = client.reduce((soma, i)=>{ return soma + i;});
      return total;
  },

  totalProduct: async(product)=>{
    const json = JSON.parse(await readFile('pedidos.json'));
    const productOne = json.pedidos
      .filter(pedido => pedido.produto === product && pedido.entregue == true)
      .map(res => res.valor);
    const totalProduct = productOne.reduce((soma, i )=>{ return soma + i;});

    return totalProduct.toString();
  },

  getMaisVendidos: async()=>{
    const products = [];
    const productsFormat = [];
    const data = JSON.parse(await readFile('pedidos.json'));

    data.pedidos.forEach((pedido) => {
      let index = products.findIndex((p) => p.product === pedido.produto);
      if (pedido.entregue) {
        if (index === -1) {
          products.push({ product: pedido.produto, qtd: 1 });
        } else {
          products[index].qtd++;
        }
      }
    });

    products.sort((a, b) => b.qtd - a.qtd);
    products.forEach((product) => {
      productsFormat.push(`${product.product} - ${product.qtd}`);
    });

    return productsFormat;
  }
}
export default personRepository;
