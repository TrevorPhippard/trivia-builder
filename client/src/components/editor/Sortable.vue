<script setup lang="ts">
import draggable from "vuedraggable";
import { ref } from "vue";
import { useEditorStore } from "../../store/editorStore.ts";

const store = useEditorStore();

defineProps({
    itemsContent: Array,
})

const slide = ref(0);

function showSlide(index: number) {
    slide.value = index;
    store.onSlideAction(index)
}

function add() {
    store.onSlideAdd()
}

function remove() {
    store.onSlideRemove()
}

function changeOrder(event: any) {
    const { newIndex, oldIndex } = event.moved;
    if (newIndex !== oldIndex) store.onSlideMove(newIndex, oldIndex)
}

</script>
<template>
    <h4>Order Slides</h4>
    <div v-if="itemsContent" :class="{ sideScroll: itemsContent.length > 6 }">
        <draggable :list="itemsContent" :animation="100" ghost-class="invisable-card" group="list"
            class="sortable-list " tag="ul" @change="changeOrder">
            <template #item="{ element, index }">
                <li :class="{ active: index == slide }" @mouseup="showSlide(index)">
                    {{ element.name }}
                </li>
            </template>
        </draggable>
    </div>
    <div class="btnCont">
        <button @click="add">create slide</button>
        <button @click="remove">remove selected</button>
    </div>
</template>
<style>
.btnCont button {
    margin-top: 20px;
}

.sideScroll {
    max-height: 250px;
    overflow-y: scroll;
}

.sortable-list {
    list-style: none;
    padding-left: 0px;
}

.sortable-list li {
    background-color: var(--accent-bg);
    min-width: 100px;
    padding: 4px 10px;
    border-radius: 3px;
    border: 1px solid #555;
    cursor: grab
}

.sortable-list *+* {
    margin-top: 10px;
}

.sortable-list li.active {
    color: var(--accent1-hover);
}

.invisable-card {
    opacity: 0.2;
}

button+button {
    margin-left: 10px
}
</style>
