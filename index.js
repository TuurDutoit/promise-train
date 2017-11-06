module.exports = function chain(obj = this, items = []) {
  const proxy = new Proxy(function(){}, {
    get(target, prop) {
      items.push({ prop });
      return proxy;
    },
    apply(target, self, args) {
      const item = items[items.length - 1];
      
      if(item.prop === "exec") {
        if(args[0] === true) {
          args = args.slice(1);
        }
        else {
          return exec(obj, items.slice(0, -1));
        }
      }
      
      item.args = args;
      return proxy;
    }
  });
  
  return proxy;
}

async function exec(obj, items) {
  for(const item of items) {
    if(item.args) {
      obj = obj[item.prop].apply(obj, item.args);
      if(obj && typeof obj.then === "function") {
        obj = await obj;
      }
    }
    else {
      obj = obj[item.prop];
    }
  }
  
  return obj;
}