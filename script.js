function combine(a, b, retry = true) {
  
  let i = a.indexOf(b[0]);

  while(i > -1) {

    let size = Math.min(a.length - i, b.length);

    if (a.slice(i).slice(0, size) === b.slice(0, size)) {

      return a + b.slice(size);
    }

    i = a.indexOf(b[0], i + 1);

  }

  if (retry) {
    return combine(b, a, false);
  }
  return b + a;
}

function getLongestOverlap(collection) {

  let longest = { overlapSize: -1};

  for (let j = 1; j < collection.length; j++) {
    let b = collection[j];
    for (let i = 0; i < j; i++) {
      let a = collection[i];
      const merged = combine(a, b);

      const overlapSize = a.length + b.length - merged.length;

      if (overlapSize > longest.overlapSize) {
        longest = { merged, i, j, overlapSize };
      }
    }
  }
  return longest;
}


function begin(...collection) {
  for (let i = collection.length; --i; ) {
    const { merged, i, j } = getLongestOverlap(collection);

    collection.splice(j, 1);
    collection.splice(i, 1);

    collection.push(merged);
  }
  return collection[0];
}

let collection = ["all is well", "ell that en", "hat end", "t ends well"];

const result = begin(...collection);

console.log(result);




















