const Memory=require ('./memory');

const mem=new Memory;

class Array{
	constructor(){
		this.length=0;
        this.ptr=mem.allocate(this.length);
	}

	push(value) { // O(n)
        this.resize(this.length + 1);
        mem.set(this.ptr + this.length, value);
        this.length++;
	}

	resize(size) { // best and average case for pushing you won't need to resize, so these become O(1) operations. In the worst case, you still need to resize so that remains O(n).
        const oldPtr = this.ptr;
		this.ptr = mem.allocate(size);
		if (this.ptr === null) {
            throw new Error('Out of memory');
        }
		console.log(this.ptr,oldPtr,this.length)
        mem.copy(this.ptr, oldPtr, this.length);
        mem.free(oldPtr);
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

function main(){
	Array.SIZE_RATIO=3;

	// Create an instance of the Array class
	let arr = new Array();

	// Add an item to the array
	arr.push(3);
	arr.push(5);
	arr.push(15);
	arr.push(19);
	arr.push(45);
	arr.push(10);
	console.log(arr);
	console.log(mem.get(0))
	// console.log(arr);
}

main()
// debugger


// 3   - mem.get(0)
// 3 3   - mem.get(1)
// 3 3 5   - mem.get(2)
// 3 3 5 3   - mem.get(3)
// 3 3 5 3 5   - mem.get(4)
// 3 3 5 3 5 15   - mem.get(5)
// 3 3 5 3 5 15 3   - mem.get(6)
// 3 3 5 3 5 15 3 5   - mem.get(7)
// 3 3 5 3 5 15 3 5 15   - mem.get(8)
// 3 3 5 3 5 15 3 5 19   - mem.get(9)
// 3 3 5 3 5 15 3 5 19 3   - mem.get(10)
// 3 3 5 3 5 15 3 5 19 3 5  - mem.get(11)
// 3 3 5 3 5 15 3 5 19 3 5 15  - mem.get(12)
// 3 3 5 3 5 15 3 5 19 3 5 15 19  - mem.get(13)
// 3 3 5 3 5 15 3 5 19 3 5 15 19 45  - mem.get(14)
// 3 3 5 3 5 15 3 5 19 3 5 15 19 45 3  - mem.get(15)
// 3 3 5 3 5 15 3 5 19 3 5 15 19 45 3 5  - mem.get(16)
// 3 3 5 3 5 15 3 5 19 3 5 15 19 45 3 5 15  - mem.get(17)
// 3 3 5 3 5 15 3 5 19 3 5 15 19 45 3 5 15 19  - mem.get(18)
// 3 3 5 3 5 15 3 5 19 3 5 15 19 45 3 5 15 19 45  - mem.get(19)
// 3 3 5 3 5 15 3 5 19 3 5 15 19 45 3 5 15 19 45 10 - mem.get(20)

// Not sure how to explain the above output other than it appears to be a malfunctioning memory module?

// mem.get(0) - mem.get(1023) is defined and receives a default value of 0
// as expected 1024 is undefined