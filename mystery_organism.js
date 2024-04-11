// Returns a random DNA base

const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases

const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

/* 
Step 3: Create a factory function pAequorFactory() that has two parameters
- a number
- an array of 15 DNA bases
It should return an object that contains the properties specimenNum and dna that correspond to the provided params
*/

function pAequorFactory(num, mockUpStrand) {
  let objpAequor = {
    specimenNum: num,
    dna: mockUpStrand,
    /*
Step 4: Simulate high rate of mutation (change DNA)
- add method .mutate() to the above reqturned object. 
- .mutate randomly selects a base in the 'dna' property, changing it to a different base, then returning it's 'dna', 
i.e. it Was 'A' now it can be 'T', 'C' or 'G'
*/
    mutate() {
      //randomly select base in .dna
      const initialRandomDna =
        this.dna[Math.floor(Math.random() * this.dna.length)];

      //randomly select mutation with !match
      let mutatedRandomDna = "";
      do {
        mutatedRandomDna =
          this.dna[Math.floor(Math.random() * this.dna.length)];
      } while (mutatedRandomDna === initialRandomDna);

      //add 'base' back into dna and return string (I think that's what they're asking for)
      this.dna[Math.floor(Math.random() * this.dna.length)] = mutatedRandomDna;
      return this.dna;
    },

    /*
    Step 5: Compare different DNA sequences with .compareDNA(pAequor)
    - compare the current pAequor .dna with the passed in version and compute how many bases are identical and in same locations
    - does not return but prints a percentage of commonality message.
    - use .specimenNum to identify which pAequor object are being compared.
    */
    compareDNA(anotherPAequor) {
      let spec1 = this.dna;
      let spec2 = anotherPAequor.dna;
      let matches = 0;

      //loop thru arrays of both specemins and count matches
      for (let i = 0; i < spec1.length; i++) {
        for (let j = 0; j < spec2.length; j++) {
          if (spec1[i] === spec2[j]) {
            matches++;
          }
        }
      }
      //percentage calculation
      const percentageMatch = (matches / this.dna.length) * 100;

      //print the message
      console.log(
        `specimen ${this.specimenNum} and specimen ${anotherPAequor.specimenNum} have ${percentageMatch}% DNA in common`
      );
    },

    /*
    Step 6: in returned object pAequorFactory() add another method .willLikelySurvive() to return true if an objects .dna contains at least 60% C or G
    bases, otherwise false.
    */

    willLikelySurvive() {
      // Count number of C or G bases
      let countCorG = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === "C" || this.dna[i] === "G") {
          countCorG++;
        }
      }
      //calculate percentage and return true: false if >=60%
      const percentageCorG = countCorG / this.dna.length;
      return percentageCorG >= 0.6;
    },
  };
  return objpAequor;
}

//step 7: create 30 instances of PAequor that can survive and store in array.
let SurvInstances = [];
let numOfInst = 0;
while (numOfInst < 30) {
  const instance = pAequorFactory(numOfInst, mockUpStrand());
  if (instance.willLikelySurvive()) {
    SurvInstances.push(instance);
    numOfInst++;
  }

  //tidy array into just specimenNum and dna
  let mappedSurvivingInstances = SurvInstances.map((i) => {
    return {
      specimenNum: i.specimenNum,
      dna: i.dna,
    };
  });
  console.log(mappedSurvivingInstances);
}

//TESTING logs below:

//console.log("---------");

//let sample = pAequorFactory(1, mockUpStrand());
//console.log(sample);

//console.log("---------");
//console.log(sample.mutate());
