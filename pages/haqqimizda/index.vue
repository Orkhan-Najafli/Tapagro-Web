<template>
  <div class="h-full min-h-full">
    <div class="pt-3 max-w-[1224px] container mx-auto px-6 xl:px-0">
      <section class="my-6 md:flex flex-row hidden">
        <a-breadcrumb separator=">">
          <a-breadcrumb-item class="text-sm leading-5 font-normal" href="">
            <nuxt-link to="/">
              <span class="font-medium text-sm text-[#4B5563]">
                {{ $t("main_page") }}</span
              ></nuxt-link
            >
          </a-breadcrumb-item>
          <a-breadcrumb-item class="text-sm leading-5 font-normal">
            <span class="font-semibold text-sm text-[#1F2937]">{{
              $t("about")
            }}</span>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </section>
    </div>
    <section
      class="h-auto w-full block max-w-[1224px] container mx-auto px-6 xl:px-0 mb-16 md:mb-24 mt-6 md:mt-0"
    >
      <div class="flex flex-col md:flex-row items-start">
        <div class="w-full mb-11 md:mb-0">
          <div
            id="dynamic-title"
            v-html="titleText"
            class="text-3xl font-bold mb-6 text-gray-900"
          ></div>
          <div
            id="dynamic-description"
            class="text-xl font-medium text-gray-600 m-0 mb-6"
            v-html="description"
          ></div>
        </div>
        <div class="w-full rounded-md md:ml-10">
          <img
            class="object-cover about_img"
            src="../../assets/img/aboutImg.png"
            alt=""
          />
        </div>
      </div>
    </section>
    <section class="h-auto w-full block py-12 bg-[#F9FAFB] mb-6 md:mb-24">
      <div class="mx-auto flex justify-center">
        <ul
          class="flex flex-col justify-center max-w-[1224px] container mx-auto md:flex-row md:justify-between items-center w-full h-auto m-0 p-0 md:px-6 lg:px-20"
        >
          <li
            class="flex flex-col justify-center items-center text-gray-600 mb-11 md:mb-0"
            v-for="(item, index) in statistics"
            :key="index"
          >
            <strong class="text-3xl">{{ Math.floor(item.counter) }} +</strong>
            <span
              id="other-values"
              class="font-medium text-xl"
              v-html="item.value"
            ></span>
          </li>
        </ul>
      </div>
    </section>

    <section
      class="h-auto w-full max-w-[1224px] block px-6 container xl:px-0 mx-auto mb-6 md:mb-14"
    >
      <div class="video-container">
        <iframe
          id="my-video"
          src="https://www.youtube.com/embed/eGw7QDr831U?modestbranding=1?rel=0"
          width="100%"
          class="w-full min-h-[200px] sm:min-h-[300px] md:h-[500px] lg:h-[580px] rounded-xl"
          frameborder="0"
          allowfullscreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const statistics = reactive([
  {
    counter: 0,
    targetNumber: 500,
    value: "",
  },
  {
    counter: 0,
    targetNumber: 430000,
    value: "",
  },
  {
    counter: 0,
    targetNumber: 11000,
    value: "",
  },
  {
    counter: 0,
    targetNumber: 1600000,
    value: "",
  },
]);
const titleText = ref();
const description = ref();

const statisticValues = function (value: any, index: number) {
  statistics[index].value = value.content;
};
const statisticTargetNumber = function (value: any, index: number) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(value.content, "text/html");
  statistics[index].targetNumber = Number(doc.body.textContent);
  for (let index = 0; index < statistics.length; index++) {
    const element = statistics[index];
    let increment = element.targetNumber / ((2 * 1000) / 10);
    let timer = setInterval(() => {
      if (element.counter >= element.targetNumber) {
        element.counter = element.targetNumber;
        clearInterval(timer);
      } else {
        element.counter += increment;
      }
    }, 10);
  }
};
const fetchAndMapSections = async () => {
  // Asinxron məlumatı gözləyin
  await useAboutStore().fetchSections({ page: "ABOUT_US" });

  // Məlumatlar uğurla gəldiyindən əmin olun
  if (
    useAboutStore().getStatus === "success" &&
    useAboutStore().getSections.length
  ) {
    useAboutStore().getSections.map((item, index) => {
      switch (item.keyword) {
        case "AboutUs.Stats.Seller.Count":
          statisticTargetNumber(item, 0);
          break;
        case "AboutUs.Stats.Seller.Text":
          statisticValues(item, 0);
          break;
        case "AboutUs.Stats.Buyer.Count":
          statisticTargetNumber(item, 1);
          break;
        case "AboutUs.Stats.Buyer.Text":
          statisticValues(item, 1);
          break;
        case "AboutUs.Stats.Order.Count":
          statisticTargetNumber(item, 2);
          break;
        case "AboutUs.Stats.Order.Text":
          statisticValues(item, 2);
          break;
        case "AboutUs.Stats.Product.Count":
          statisticTargetNumber(item, 3);
          break;
        case "AboutUs.Stats.Product.Text":
          statisticValues(item, 3);
          break;
        case "AboutUs.Title":
          titleText.value = item.content;
          break;
        case "AboutUs.Description":
          description.value = item.content;
          break;
        default:
          break;
      }
    });
  }
};

// Funksiyanı çağırın
fetchAndMapSections();
</script>
<style>
#dynamic-description :is(h1, h2, h3, h4, h5, h6),
#dynamic-description s,
#dynamic-description u,
#dynamic-description strong,
#dynamic-description em,
#dynamic-description blockquote {
  color: #4b5563;
}
#dynamic-title :is(h1, h2, h3, h4, h5, h6),
#dynamic-title em,
#dynamic-title s,
#dynamic-title u,
#dynamic-title strong,
#dynamic-title blockquote,
#dynamic-title {
  color: #111827 !important;
}
#other-values :is(h1, h2, h3, h4, h5, h6),
#other-values strong,
#other-values em,
#other-values s,
#other-values u,
#other-values blockquote {
  color: #4b5563;
}

@media only screen and (max-width: 768px) {
  img.about_img {
    min-width: 300px;
    min-height: 222px;
  }
}

@media only screen and (min-width: 768px) {
  img.about_img {
    width: 580px;
    height: 386px;
  }
}
</style>
