<template>
    <div class="modal fade" id="delete-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <slot name="modal-delete-body"></slot>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <slot name="modal-action-button"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'delete-modal'
    }
</script>
