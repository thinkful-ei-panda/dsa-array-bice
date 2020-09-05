import Memory from './memory';

class Array {
    constructor() {
        this.length = 0;
        this.ptr = memory.allocate(this.length);
	}
	
	push(value) { // O(n)
        this._resize(this.length + 1);
        memory.set(this.ptr + this.length, value);
        this.length++;
	}
	_resize(size) { // best and average case for pushing you won't need to resize, so these become O(1) operations. In the worst case, you still need to resize so that remains O(n).
        const oldPtr = this.ptr;
        this.ptr = memory.allocate(size);
        if (this.ptr === null) {
            throw new Error('Out of memory');
        }
        memory.copy(this.ptr, oldPtr, this.length);
        memory.free(oldPtr);
	}
	get(index) {//  best, worst, and average-case performance of O(1).
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        return memory.get(this.ptr + index);
	}
	pop() {// O(1) operation.
        if (this.length == 0) {
            throw new Error('Index error');
        }
        const value = memory.get(this.ptr + this.length - 1);
        this.length--;
        return value;
	}
	insert(index, value) {// best-case performance of O(1), worst case O(n), average case is also O(n)
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }

        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
        memory.set(this.ptr + index, value);
        this.length++;
	}
	remove(index) { // best-case performance is O(1) (the same as popping), and the average and worst cases are O(n).
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
        this.length--;
    }
}
Array.SIZE_RATIO = 3;