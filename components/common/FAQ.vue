<template>
  <div class="block w-full h-auto min-w-full">
    <div class="flex flex-col mb-20">
      <h2
        class="w-full text-center h-auto mb-6 text-gray-900 font-bold text-[32px]"
      >
        {{ $t("frequently_asked_questions") }}
      </h2>
      <p class="block text-center text-gray-800 text-lg font-medium m-0 p-0">
        {{ $t("you_can_find_answers_to_the_questions_that_interest") }}
      </p>
    </div>
    <ul class="grid grid-flow-row divide-y m-0 p-0 w-full h-auto">
      <li
        class="w-full h-auto p-0 m-0 px-6"
        v-for="(item, index) in useFAQStore().getFrequentlyAskedQuestions"
        :key="index"
      >
        <div
          @click="showAnswer(index)"
          class="flex flex-row justify-between items-center py-5 cursor-pointer"
        >
          <p
            class="w-full h-auto p-0 m-0 text-gray-900 text-lg font-bold break-all"
          >
            {{ item.question }}
          </p>
          <svg
            :class="{
              'transform rotate-0': !item.visible,
              'transform -rotate-180': item.visible,
            }"
            class="transition-all duration-150 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.475 13.6188C10.7916 12.9354 9.82203 12.7969 9.30946 13.3095C8.79688 13.822 8.93539 14.7916 9.61882 15.475L14.5687 20.4249C14.9942 20.8504 15.5306 21.0646 15.9986 21.0421C16.4672 21.0656 17.0049 20.8513 17.4313 20.425L22.3811 15.4751C23.0645 14.7917 23.203 13.8222 22.6905 13.3096C22.1779 12.797 21.2084 12.9355 20.5249 13.619L16 18.1438L11.475 13.6188Z"
              fill="black"
              fill-opacity="0.25"
            />
          </svg>
        </div>
        <div
          :class="{
            'h-0': !item.visible,
            'h-auto': item.visible,
          }"
          class="w-full overflow-hidden transition-all duration-150 ease-in-out"
        >
          <p class="w-full h-auto p-0 m-0 pb-5 break-all">
            {{ item.answer }}
          </p>
        </div>
      </li>
    </ul>
    <div class="flex flex-col mt-20">
      <h2
        class="w-full text-center h-auto mb-6 text-gray-900 font-bold text-[32px]"
      >
        {{ $t("still_have_questions") }}
      </h2>
      <p class="block text-center text-gray-800 text-lg font-medium m-0 p-0">
        {{ $t("do_not_hesitate_to_contact_us") }}
      </p>
      <ul
        class="flex flex-col md:flex-row justify-center items-center px-0 m-0 mt-6"
      >
        <li
          class="cursor-pointer text-sm leading-4 font-semibold text-[#059669] flex justify-start mb-3 md:mb-0 md:mr-3 items-center"
        >
          <span
            class="w-6 h-6 mr-2 bg-[#ECFDF5] rounded-md flex justify-center items-center"
          >
            <svg
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.199951 1.29995C0.199951 0.96858 0.46858 0.699951 0.799951 0.699951H2.09168C2.38498 0.699951 2.63529 0.911999 2.68351 1.20131L3.1271 3.86284C3.1704 4.12266 3.03919 4.38033 2.80359 4.49813L1.87471 4.96257C2.54449 6.62694 3.87296 7.95542 5.53733 8.6252L6.00177 7.69631C6.11957 7.46072 6.37725 7.3295 6.63707 7.3728L9.29859 7.81639C9.5879 7.86461 9.79995 8.11492 9.79995 8.40823V9.69995C9.79995 10.0313 9.53132 10.3 9.19995 10.3H7.99995C3.69213 10.3 0.199951 6.80777 0.199951 2.49995V1.29995Z"
                fill="#059669"
              />
            </svg>
          </span>
          <span> +994 70 555 75 58</span>
        </li>
        <li
          class="cursor-pointer text-sm leading-4 font-semibold text-[#059669] flex items-center"
        >
          <span
            class="w-6 h-6 mr-2 bg-[#ECFDF5] rounded-md flex justify-center items-center"
          >
            <svg
              width="10"
              height="9"
              viewBox="0 0 10 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.202012 2.03004L4.99998 4.42902L9.79801 2.03C9.76182 1.39979 9.23929 0.899902 8.60001 0.899902H1.40001C0.760723 0.899902 0.238193 1.39981 0.202012 2.03004Z"
                fill="#059669"
              />
              <path
                d="M9.80001 3.37065L4.99998 5.77066L0.200012 3.37068V6.8999C0.200012 7.56264 0.737271 8.0999 1.40001 8.0999H8.60001C9.26275 8.0999 9.80001 7.56264 9.80001 6.8999V3.37065Z"
                fill="#059669"
              /></svg
          ></span>
          <span>Info@tapagro.az</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
useFAQStore().fetchFAQ();
const showAnswer = function (index: number) {
  useFAQStore().getFrequentlyAskedQuestions[index].visible =
    !useFAQStore().getFrequentlyAskedQuestions[index].visible;
};
</script>
