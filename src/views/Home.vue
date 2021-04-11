<template>
  <div class="grid">
    <main
      class="message-section"
      v-chat-scroll="{ smooth: true, notSmoothOnInit: true }"
    >
      <div v-if="messages && messages.length" class="message-wrapper">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="['message', { message_my: message.req }]"
        >
          <div class="message__bubble">
            <div class="message__owner">
              {{ message.req ? "Вы" : "Дербент" }}
            </div>
            <div class="message__text">
              {{ message.text }}
              <div class="message__time">{{ message.time }}</div>
            </div>
          </div>
          <div v-if="message.type === 'widget'" class="widget-wrapper">
            <div class="widget">
              <a
                v-for="(item, index) in message.context"
                target="_blank"
                :key="index"
                :href="`https://maps.google.com/?q=${item.coordinate.latitude},${item.coordinate.longitude}`"
              >
                <div class="widget__card">
                  <img
                    v-if="item.image && item.image.length"
                    class="widget__card-image"
                    :src="item.image[0]"
                    alt=""
                  />
                  <div class="widget__card-text">
                    <div class="widget__card-title">{{ item.title }}</div>
                  </div>
                  <div
                    v-if="item.image && item.image.length"
                    class="widget__card-type"
                  >
                    <svg
                      width="10"
                      height="12"
                      viewBox="0 0 10 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.48615 11.7579C0.702344 6.82104 0 6.31437 0 4.5C0 2.01471 2.23857 0 5 0C7.76143 0 10 2.01471 10 4.5C10 6.31437 9.29766 6.82104 5.51385 11.7579C5.26555 12.0807 4.73443 12.0807 4.48615 11.7579ZM5 6.375C6.1506 6.375 7.08333 5.53554 7.08333 4.5C7.08333 3.46446 6.1506 2.625 5 2.625C3.8494 2.625 2.91667 3.46446 2.91667 4.5C2.91667 5.53554 3.8494 6.375 5 6.375Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="message-wrapper">
        <div>Нет сообщений</div>
      </div>
    </main>
    <form @submit.prevent="send" class="form">
      <input
        v-model="message"
        type="text"
        placeholder="Введите сообщение..."
        class="input mb-16"
      />
      <button class="button mb-16" type="submit">Отправить</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Chat",
  data: () => ({
    message: null,
    messages: [],
  }),
  methods: {
    send() {
      if (this.message && this.message.trim()) {
        let time = new Date();
        time = time.getHours() + ":" + time.getMinutes();
        this.messages.push({ text: this.message, req: true, time });
        const message = this.message;
        this.message = null;
        this.$axios.get(`?msg=${message}`).then((res) => {
          console.log(res.data);

          this.messages.push({
            type: res.data.type,
            text: res.data.message,
            context: res.data.context,
            time,
          });
        });
      } else {
        console.log("Введите сообщение");
      }
    },
  },
};
</script>

<style>
body {
  min-height: 100vh;
  /* mobile viewport bug fix */
  min-height: -webkit-fill-available;
}

html {
  height: -webkit-fill-available;
}

.grid {
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 1fr max-content;
  position: relative;
}

@supports (-webkit-touch-callout: none) {
  .grid {
    height: -webkit-fill-available !important;
  }
}

.message-section {
  padding-top: 20px;
  overflow: auto;
  margin-right: -30px;
  padding-right: 30px;
}

.message-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 100%;
  width: 100%;
  padding-bottom: 170px;
  position: relative;
}
</style>
