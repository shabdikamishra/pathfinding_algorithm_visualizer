export class PriorityQueue {
constructor(comparator = (a, b) => a < b) {
this._heap = [];
this._comparator = comparator;
}


size() {
return this._heap.length;
}


isEmpty() {
return this._heap.length === 0;
}


peek() {
return this._heap[0];
}


push(value) {
this._heap.push(value);
this._siftUp();
}

pop() {
const poppedValue = this._heap[0];
const bottom = this._heap.pop();
if (this._heap.length > 0) {
this._heap[0] = bottom;
this._siftDown();
}
return poppedValue;
}


_parent(index) {
return Math.floor((index - 1) / 2);
}


_left(index) {
return index * 2 + 1;
}


_right(index) {
return index * 2 + 2;
}


_siftUp() {
let nodeIndex = this._heap.length - 1;
while (nodeIndex > 0 && this._comparator(this._heap[nodeIndex], this._heap[this._parent(nodeIndex)])) {
this._swap(nodeIndex, this._parent(nodeIndex));
nodeIndex = this._parent(nodeIndex);
}
}

_siftDown() {
let nodeIndex = 0;
while (
(this._left(nodeIndex) < this._heap.length && this._comparator(this._heap[this._left(nodeIndex)], this._heap[nodeIndex])) ||
(this._right(nodeIndex) < this._heap.length && this._comparator(this._heap[this._right(nodeIndex)], this._heap[nodeIndex]))
) {
let maxChild = (this._right(nodeIndex) < this._heap.length && this._comparator(this._heap[this._right(nodeIndex)], this._heap[this._left(nodeIndex)])) ? this._right(nodeIndex) : this._left(nodeIndex);
this._swap(nodeIndex, maxChild);
nodeIndex = maxChild;
}
}


_swap(i, j) {
[this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
}
}
