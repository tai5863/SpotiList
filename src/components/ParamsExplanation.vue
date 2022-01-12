<template>
  <div class="params_explanation">
    <ul v-for="param in params" :key="param.id">
      <li class="param">
        <p class="param_name">{{ param.name }}</p>
        <p class="param_exp">{{ param.exp }}</p>
      </li>
    </ul>
    <div class="button_container close_exp">
      <button @click="close" class="operator close_exp">閉じる</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ParamsExplanation",
  data() {
    return {
      params: [
        {
          name: "Acousticness",
          exp: "トラックがアコースティック(電気を使用しない楽器を用いた演奏)であるかどうかを表します。"
        },
        {
          name: "Danceability",
          exp: "テンポ、リズムの安定性、ビートの強さ、全体的な規則性などの音楽的要素の組み合わせによって、楽曲がダンスにどの程度適しているかを表します。"
        },
        {
          name: "Duration(ms)",
          exp: "トラックの時間をミリ秒で指定します。"
        },
        {
          name: "Energy",
          exp: "エネルギーは0.0から1.0までの値で、強度と活動性の知覚的な指標を表します。一般的に、エネルギー感のある曲は、速く、うるさく、騒がしいと感じられます。"
        },
        {
          name: "Instrumentalness",
          exp: 'ボーカルがないトラックかどうかを予測します。インストゥルメンタルネス値が1.0に近いほど、そのトラックにはボーカルコンテンツが含まれない可能性が高くなります。'
        },
        {
          name: "Key",
          exp: "トラックが置かれているキーを表します。整数は、標準的なPitch Class表記で音程にマッピングされます。(例：0 = C、1 = C♯/D♭、2 = D、など)。キーが検出されなかった場合、値は-1です。"
        },
        {
          name: "Liveness",
          exp: "録音に観客がいることを検出します。Livenessの値が高いほど、そのトラックがライブで演奏された可能性が高くなります。"
        },
        {
          name: "Loudness",
          exp: "トラックの全体的なラウドネスをデシベル(dB)で表示します。値は通常、-60～0dbの範囲です。"
        },
        {
          name: "Mode",
          exp: "モードは楽曲の旋律を構成する音階の種類を表すモダリティ(メジャーまたはマイナー)です。メジャーは1、マイナーは0で表します。"
        },
        {
          name: "Speechiness",
          exp: "トラック内の話し言葉の存在を検出します。音声のみの録音(トークショー、オーディオブック、詩など)であればあるほど、属性値は1.0に近くなります。"
        },
        {
          name: "Tempo",
          exp: "曲の全体的な推定テンポを1分あたりの拍数(BPM)で表します。"
        },
        {
          name: "Time Signature",
          exp: "推定される拍子記号。拍子記号とは、1小節に何拍子あるかを指定するための表記法です。拍子記号は3から7まであり、3/4から7/4までの拍子記号があります。"
        },
        {
          name: "Valence",
          exp: "楽曲が持つ音楽的なポジティブさを0.0から1.0までの数値で表します。"
        }
      ],
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.params_explanation {
  width: 100vw;
  height: 100vw;
}
.param {
  list-style: none;
  margin: 3rem 0;
}
.param_name {
  font-size: 1.3rem;
  margin: 1rem 0;
}
.param_exp {
  font-family: "游ゴシック", "Yu Gothic", "游ゴシック体", YuGothic, sans-serif;
  font-weight: 500;
  font-size: 1rem;
}
.button_container > .close_exp {
  text-align: center;
  position: fixed;
  right: 5%;
  bottom: 0;
}
.operator {
  display: inline-block;
  transition-duration: 0.6s;
  font-family: "游ゴシック", "Yu Gothic", "游ゴシック体", YuGothic, sans-serif;
  font-weight: 1000;
  font-size: 15px;
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 40px;
  padding: 15px 30px;
  cursor: pointer;
  margin: 40px auto;
  width: 250px;
}
.operator:hover {
  background-color: rgba(255, 255, 255, 0.7);
}
</style>
