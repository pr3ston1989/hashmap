function hash(key) {
  let hashCode = 0;
  const primeNumber = 31;
  for (let i = 0; i < key.length; i++) {
    hashCode = primeNumber * hashCode + key.charCodeAt(i);
  }
  return hashCode;
}

export class HashMap {
  constructor(buckets = 8) {
    this.buckets = buckets;
    this.loadFactor = 0.75;
    this.elements = 0;
    this.hashTable = Array.from({ length: this.buckets }, () => new Array());
  }

  set(key, value) {
    if (this.loadValueAfterNewItem > this.loadFactor) {
      this.buckets *= 2;
      this.resizeHashTable(this.buckets);
    }
    const keyHash = hash(key) % this.buckets;
    const bucket = this.hashTable[keyHash];
    const index = bucket.findIndex((entry) => entry.key === key);
    if (index !== -1) {
      bucket[index].value = value;
    } else {
      bucket.push({ key, value });
      this.elements++;
    }
  }

  get(key) {
    const keyHash = hash(key) % this.buckets;
    const bucket = this.hashTable[keyHash];
    const index = bucket.findIndex((entry) => entry.key === key);
    if (index !== -1) {
      return bucket[index].value;
    } else {
      return null;
    }
  }

  has(key) {
    const keyHash = hash(key) % this.buckets;
    const bucket = this.hashTable[keyHash];
    const index = bucket.findIndex((entry) => entry.key === key);
    if (index !== -1) {
      return true;
    }
    return false;
  }

  remove(key) {
    if (!this.has(key)) {
      return false;
    }
    const keyHash = hash(key) % this.buckets;
    const bucket = this.hashTable[keyHash];
    this.hashTable[keyHash] = bucket.filter((obj) => obj.key !== key);
    this.elements--;
    return true;
  }

  get loadValueAfterNewItem() {
    return (this.elements + 1) / this.buckets;
  }

  get length() {
    return this.elements;
  }

  getSelection(option) {
    const arr = [];
    for (const bucket of this.hashTable) {
      for (const { key, value } of bucket) {
        if (option === "values") {
          arr.push(value);
        } else if (option === "keys") {
          arr.push(key);
        } else {
          arr.push([key, value]);
        }
      }
    }
    return arr;
  }

  get keys() {
    return this.getSelection("keys");
  }

  get values() {
    return this.getSelection("values");
  }

  get entries() {
    return this.getSelection("entries");
  }

  clear() {
    this.elements = 0;
    this.buckets = 8;
    this.hashTable = Array.from({ length: this.buckets }, () => new Array());
  }

  resizeHashTable(size) {
    this.elements = 0;
    const oldTable = this.hashTable;
    this.hashTable = Array.from({ length: size }, () => new Array());
    for (const bucket of oldTable) {
      for (const { key, value } of bucket) {
        this.set(key, value);
      }
    }
  }
}
