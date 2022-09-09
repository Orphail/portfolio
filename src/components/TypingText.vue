<template>
    <div class="font-normal text-2xl h-6">
        <div class="flex items-center">
            <span>{{ text }}</span>
            <span class="h-full w-1 ml-1 dark:bg-gray-100 bg-gray-900" :class="showCursor ? '' : 'hidden'">&nbsp;</span>
        </div>
    </div>
</template>
<script setup>
    import { ref, onMounted, defineProps } from 'vue'
    const props = defineProps({
        typeSpeed: Number,
        cursorSpeed: Number,
        pauseStart: Number,
        pauseEnd: Number,
        returnToCharIndex: Number,
        originalText: String,
        correctedText: String
    })
    const textArray = [props.originalText, props.correctedText]
    let textIndex = 0
    let charIndex = 0
    let direction = 'forward'
    const text = ref('')
    const showCursor = ref(true)

    let typingInterval;

    function startTyping() {
        let current = textArray[textIndex]
        if (charIndex > current.length){
            direction = 'backward'
            clearInterval(typingInterval)
            setTimeout(function(){
                typingInterval = setInterval(startTyping, props.typeSpeed)
            }, props.pauseEnd)
        }   
        
        text.value = current.substring(0, charIndex)
        if(direction == 'forward'){
            charIndex += 1
            if (textIndex == textArray.length - 1 && charIndex == current.length + 1){
                clearInterval(typingInterval)
            }
        } else {
            if (charIndex == props.returnToCharIndex){
                direction = 'forward'
                clearInterval(typingInterval)
                setTimeout(function(){
                
                    textIndex += 1
                    if(textIndex >= textArray.length){
                        textIndex = 0
                    }
                
                    typingInterval = setInterval(startTyping, props.typeSpeed)
                }, props.pauseStart)
            }
            charIndex -= 1
        }
    }

    onMounted(() => {
        typingInterval = setInterval(startTyping, props.typeSpeed)

        setInterval(function(){
            showCursor.value = !showCursor.value
        }, props.cursorSpeed)
    })
</script>