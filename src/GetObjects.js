export function GetObjectDetails(transactionDetails) {
  const objects = [];
  const trans = {
    transaction: transactionDetails,
  };

  function GetObjects(trans) {
     Object.entries(trans).map((k, i) => {
      if (typeof k[1] === "object") {
        const key = k[0];
        const vals = Object.entries(k[1]);
        const o = {
          [key]: vals,
        };
        objects.push(o);

        GetObjects(k[1]);
      }
    });
  }
  GetObjects(trans);

   return Object.values(objects);  
}

export default GetObjectDetails;
