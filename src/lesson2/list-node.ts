class ListNode {
    val: number
    next: ListNode | null

    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}


const node5 = new ListNode(10, null); // последний узел
const node4 = new ListNode(2, node5);
const node3 = new ListNode(6, node4);
const node2 = new ListNode(3, node3);
const head = new ListNode(5, node2); // первый узел

function selectionSortListNode(head: ListNode | null): ListNode {
    return new ListNode(1, null)
}

selectionSortListNode(head)

// https://leetcode.com/problems/merge-two-sorted-lists/description/?envType=problem-list-v2&envId=linked-list

// https://leetcode.com/problems/sort-list/description/?envType=problem-list-v2&envId=linked-list