const o={id:1,body:"CRUD is really awesome"},e={method:"PATCH",body:JSON.stringify(o),headers:{"Content-Type":"application/json; charset=UTF-8"}};fetch(`https://jsonplaceholder.typicode.com/posts/${o.id}`,e).then((o=>o.json())).then((o=>console.log(o))).catch((o=>console.log("ERROR"+o)));
//# sourceMappingURL=index.7f0daf6b.js.map
