<template>
  <div>
    <svg class="svg-defs" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <symbol id="icon-play-def" viewBox="0 0 32 32">
          <path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13zM12 9l12 7-12 7z"></path>
        </symbol>

        <symbol id="icon-loop-def" viewBox="0 0 32 32">
          <path d="M27.802 5.197c-2.925-3.194-7.13-5.197-11.803-5.197-8.837 0-16 7.163-16 16h3c0-7.18 5.82-13 13-13 3.844 0 7.298 1.669 9.678 4.322l-4.678 4.678h11v-11l-4.198 4.197z"></path>
          <path d="M29 16c0 7.18-5.82 13-13 13-3.844 0-7.298-1.669-9.678-4.322l4.678-4.678h-11v11l4.197-4.197c2.925 3.194 7.13 5.197 11.803 5.197 8.837 0 16-7.163 16-16h-3z"></path>
        </symbol>

        <symbol id="icon-check-def" viewBox="0 0 24 24">
          <path d="M9 16.172l10.594-10.594 1.406 1.406-12 12-5.578-5.578 1.406-1.406z"></path>
        </symbol>

        <symbol id="icon-exclamation-triangle-def" viewBox="0 0 28 28">
          <path d="M16 21.484v-2.969c0-0.281-0.219-0.516-0.5-0.516h-3c-0.281 0-0.5 0.234-0.5 0.516v2.969c0 0.281 0.219 0.516 0.5 0.516h3c0.281 0 0.5-0.234 0.5-0.516zM15.969 15.641l0.281-7.172c0-0.094-0.047-0.219-0.156-0.297-0.094-0.078-0.234-0.172-0.375-0.172h-3.437c-0.141 0-0.281 0.094-0.375 0.172-0.109 0.078-0.156 0.234-0.156 0.328l0.266 7.141c0 0.203 0.234 0.359 0.531 0.359h2.891c0.281 0 0.516-0.156 0.531-0.359zM15.75 1.047l12 22c0.344 0.609 0.328 1.359-0.031 1.969s-1.016 0.984-1.719 0.984h-24c-0.703 0-1.359-0.375-1.719-0.984s-0.375-1.359-0.031-1.969l12-22c0.344-0.641 1.016-1.047 1.75-1.047s1.406 0.406 1.75 1.047z"></path>
        </symbol>
      </defs>
    </svg>

    <div v-if="isLoadingNewCaptcha">
      <Loader :color="'#AAA'"
              :size="'20px'" />
    </div>
    <div v-if="!isLoadingNewCaptcha"
        class="captcha-group-container">
      <div v-html="captchaSVG"
          class="captcha-image-container"></div>
      <div class="button-container">
        <audio ref="audio" v-if="audio && audio.length > 0" :src="audio">
          Your browser does not support the audio element.
        </audio>
        <button class="captcha-button play-audio-button" @click="playAudio()" role="button">
          <svg v-if="!isLoadingAudio" class="icon-play"><use xlink:href="#icon-play-def"></use></svg>
          <svg v-if="isLoadingAudio" class="audio-spinner" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <g transform="rotate(0 50 50)">
              <rect x="45" y="9" rx="2.7" ry="0.54" width="10" height="22" fill="#fff">
                <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.8888888888888888s" repeatCount="indefinite"></animate>
              </rect>
            </g>
            <g transform="rotate(40 50 50)">
              <rect x="45" y="9" rx="2.7" ry="0.54" width="10" height="22" fill="#fff">
                <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.7777777777777778s" repeatCount="indefinite"></animate>
              </rect>
            </g>
            <g transform="rotate(80 50 50)">
              <rect x="45" y="9" rx="2.7" ry="0.54" width="10" height="22" fill="#fff">
                <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
              </rect>
            </g>
            <g transform="rotate(120 50 50)">
              <rect x="45" y="9" rx="2.7" ry="0.54" width="10" height="22" fill="#fff">
                <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.5555555555555556s" repeatCount="indefinite"></animate>
              </rect>
            </g>
            <g transform="rotate(160 50 50)">
              <rect x="45" y="9" rx="2.7" ry="0.54" width="10" height="22" fill="#fff">
                <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.4444444444444444s" repeatCount="indefinite"></animate>
              </rect>
            </g>
            <g transform="rotate(200 50 50)">
              <rect x="45" y="9" rx="2.7" ry="0.54" width="10" height="22" fill="#fff">
                <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
              </rect>
            </g>
            <g transform="rotate(240 50 50)">
              <rect x="45" y="9" rx="2.7" ry="0.54" width="10" height="22" fill="#fff">
                <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.2222222222222222s" repeatCount="indefinite"></animate>
              </rect>
            </g>
            <g transform="rotate(280 50 50)">
              <rect x="45" y="9" rx="2.7" ry="0.54" width="10" height="22" fill="#fff">
                <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.1111111111111111s" repeatCount="indefinite"></animate>
              </rect>
            </g>
            <g transform="rotate(320 50 50)">
              <rect x="45" y="9" rx="2.7" ry="0.54" width="10" height="22" fill="#fff">
                <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
              </rect>
            </g>
          </svg>
          <span>Play audio</span>
        </button>
        <button class="captcha-button try-another-image" href="javascript:void(0)" @click="handleTryAnotherImageClick()" role="button">
          <svg class="icon-loop"><use xlink:href="#icon-loop-def"></use></svg>
          <span>Try another image</span>
        </button>
      </div>
    </div>
    <div class="captcha-input-container">
      <div>
        <label for="input-answer">Enter the text you either see in the box or you hear in the audio</label>
      </div>
      <input id="input-answer"
            :class="'form-control input-answer ' + (isInputValid === false ? 'border-danger' : '')"
            v-model="inputAnswer"
            :disabled="(inputAnswer && inputAnswer.length === 6 && isLoadingCaptchaVerification) ? true : false"
            @input="handleInputChange($event)"
            maxlength="6"
            autocorrect="off"
            autocomplete="off"
            autocapitalize="none"
            aria-required="true" />
      <div v-if="isLoadingCaptchaVerification"
          class="validation-spinner-container">
        <Loader :color="'#AAA'"
                :size="'20px'" />
      </div>
    </div>
    <div v-if="errorMessage"
        class="error-message mt-2 text-danger">{{errorMessage}}</div>
  </div>
</template>

<script>
import axios from 'axios';
import { Loader } from 'common-lib-vue';

const CAPTCHA_IMAGE_URL = '/captcha';
const CAPTCHA_VERIFY_URL = '/verify/captcha';
const CAPTCHA_AUDIO_URL = '/captcha/audio';
const GENERIC_ERROR_MESSAGE = 'Could not connect to captcha service. Please try again later.';
const AUDIO_ERROR_MESSAGE = 'Could not download audio captcha. Please try again later.';
const INCORRECT_ANSWER_MESSAGE = 'Incorrect answer, please try again.';

export default {
  name: 'Captcha',
  components: {
    Loader,
  },
  props: {
    apiBasePath: {
      type: String,
      default: null,
      required: true
    },
    nonce: {
      type: String,
      default: null,
      required: true
    }
  },
  data: () => {
    return {
      isLoadingNewCaptcha: true,
      isLoadingCaptchaVerification: false,
      isLoadingAudio: false,
      captchaSVG: null,
      captchaValidation: null,
      inputAnswer: null,
      isInputValid: null,
      audio: null,
      errorMessage: null,
    }
  },
  created() {
    this.fetchNewCaptcha();
  },
  methods: {
    fetchNewCaptcha() {
      this.isLoadingNewCaptcha = true;

      axios.post(this.apiBasePath + CAPTCHA_IMAGE_URL, {
        nonce: this.nonce
      })
        .then((response) => {
          const payload = response.data;

          this.isLoadingNewCaptcha = false;
          this.captchaSVG = payload.captcha;
          this.captchaValidation = payload.validation;

          setTimeout(() => {
            this.$emit('captchaLoaded');
          }, 0);
        })
        .catch(() => {
          this.isLoadingNewCaptcha = false;
          this.errorMessage = GENERIC_ERROR_MESSAGE;
        });
    },
    handleInputChange(event) {
      const input = event.target.value;

      if (input && input.length === 6) {
        this.isLoadingCaptchaVerification = true;
        this.errorMessage = null;

        axios.post(this.apiBasePath + CAPTCHA_VERIFY_URL, {
          nonce: this.nonce,
          answer: input,
          validation: this.captchaValidation,
        })
          .then((response) => {
            const isValid = response.data.valid;
            const token = response.data.jwt;

            this.isInputValid = isValid;
            this.isLoadingCaptchaVerification = false;

            if (isValid) {
              this.$emit('captchaVerified', token);
            } else {
              this.errorMessage = INCORRECT_ANSWER_MESSAGE;
              this.inputAnswer = null;
              this.fetchNewCaptcha();
            }
          })
          .catch(() => {
            this.isLoadingCaptchaVerification = false;
            this.errorMessage = GENERIC_ERROR_MESSAGE;
            this.inputAnswer = null;
          });
      }
    },
    playAudio() {
      if (!this.isLoadingAudio) {
        this.isLoadingAudio = true;
        this.errorMessage = null;

        axios.post(this.apiBasePath + CAPTCHA_AUDIO_URL, {
          translation: 'en',
          validation: this.captchaValidation,
        })
          .then((response) => {
            const audio = response.data.audio;

            this.isLoadingAudio = false;
            this.audio = audio;

            setTimeout(() => {
              //The following code makes audio testable in Jest.
              //While it's possible to call the play() function directly from the $refs.audio,
              //JSDOM won't render this and it won't be testable. 
              //This implementation avoids this problem.
              const sound = new Audio(this.audio);
              sound.play();
            }, 0);
          })
          .catch(() => {
            this.isLoadingAudio = false;
            this.audio = null;
            this.errorMessage = AUDIO_ERROR_MESSAGE;
          });
      }
    },
    handleTryAnotherImageClick() {
      this.errorMessage = null;
      this.isInputValid = null;
      this.fetchNewCaptcha();
    }
  }
}
</script>

<style scoped>
.captcha-image-container {
  display: inline-block;
  border: solid thin #000;
}
.button-container {
  display: flex;
  flex-direction: column;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  justify-content: space-between;
}
.captcha-group-container {
  display: flex;
  flex-direction: column;
  flex-flow: wrap;
  justify-content: space-between;
  max-width: 315px;
}
#input-answer {
  max-width: 150px;
}
.svg-defs {
  display: none;
}
.captcha-button {
  background-color: #003366;
  border: none;
  border-radius: 4px;
  color: white;
  padding: 5px 10px; /* changed from the default 12px 32px */
  text-align: center;
  text-decoration: none;
  font-size: 10px; /* changed from the default 18px */
  font-family: 'BCSans', 'Noto Sans', Verdana, Arial, sans-serif;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
  box-sizing: border-box;

  /* Added to space icons and text evenly */
  justify-content: center;
  align-items: center;
  display: flex;
}
.captcha-button:hover {
  text-decoration: underline;
  opacity: 0.80;
}
.captcha-button:focus {
  box-shadow: 0 0 0 0.2rem rgba(56,89,138,0.25);
}
.captcha-button:active {
  opacity: 1;
}
.play-audio-button {
  margin-bottom: 3px;
}
.icon-play,
.icon-loop {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  stroke-width: 0;
  stroke: #FFF;
  fill: #FFF;
}
.audio-spinner {
  display: inline-block;
  width: 15px;
  height: 15px;
  stroke-width: 0;
  stroke: #FFF;
  fill: #FFF;
}
.button-container > button {
  height: 28px;
}
.button-container > button > span {
  margin-left: 4px;
}
.input-answer {
  display: inline-block;
  vertical-align: middle;
}
.validation-spinner-container {
  display: inline-block;
  margin-left: 15px;
  vertical-align: middle;
}
</style>
