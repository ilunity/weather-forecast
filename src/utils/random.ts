const { sqrt, log, sin, PI } = Math;

type MultipleEvents = {
  probabilitiesArray: number[];
  arraySize?: undefined;
} | {
  probabilitiesArray?: undefined;
  arraySize: number;
}

interface MarkovProcessReturn {
  time: number;
  nextEvent: number;
}

export abstract class Random {
  static generate = () => Math.random();
  static getBoolean = (probability = 0.5) => Math.random() < probability;
  static getFromMultipleEvents = ({ probabilitiesArray, arraySize }: MultipleEvents) => {
    let A = this.generate();
    let i = -1;

    if (!probabilitiesArray) {
      const probability = 1 / arraySize;
      probabilitiesArray = [];
      for (let j = 0; j < arraySize; j++) {
        probabilitiesArray.push(probability);
      }
    }

    do {
      A -= probabilitiesArray[++i];
    } while (A > 0);

    return i;
  };
  static normalDistribution = (mean: number, variance: number) => {
    const base = sqrt(-2.0 * log(this.generate())) * sin(2.0 * PI * this.generate());
    return base * sqrt(variance) + mean;
  };

  static ContinuousMarkovProcess(Q: number[][], current: number): MarkovProcessReturn {
    const currentQ = Q[current][current];
    const time = Math.log(this.generate()) / currentQ;

    const probabilitiesArray = Q[current].map(value => -value / currentQ);
    probabilitiesArray[current] = 0;
    const nextEvent = this.getFromMultipleEvents({ probabilitiesArray });

    return {
      time,
      nextEvent,
    };
  }
}
