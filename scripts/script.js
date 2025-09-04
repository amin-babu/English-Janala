const loadLessons = () => {
  fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json()).then(data => displayLessons(data.data));
}

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(`.lesson-btn`);
  lessonButtons.forEach(btn => btn.classList.remove('active'));
}

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url).then(res => res.json()).then(data => {
    removeActive();
    const clickBtn = document.getElementById(`lebel-btn-${id}`);
    clickBtn.classList.add('active');
    displayLabelWord(data.data)
  });
}

const loadWordDetail = async(id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
}

const displayWordDetails = (word) => {
  const detailsBox = document.getElementById('details-container');
  detailsBox.innerHTML = `
    <div class="">
      <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>
    </div>
    <div class="space-y-2">
      <h2 class="font-bold">Meaning</h2>
      <p>${word.meaning}</p>
    </div>
    <div class="space-y-2">
      <h2 class="font-bold">Example</h2>
      <p>${word.sentence}</p>
    </div>
    <div class="">
      <h2 class="font-bold mb-2">সমার্থক শব্দ গুলো</h2>
      <span class="btn bg-[#EDF7FF] border-[#D7E4EF] font-normal">${word.synonyms[0]}</span>
      <span class="btn bg-[#EDF7FF] border-[#D7E4EF] font-normal">${word.synonyms[1]}</span>
      <span class="btn bg-[#EDF7FF] border-[#D7E4EF] font-normal">${word.synonyms[2]}</span>
    </div>
  `;
  document.getElementById('word_modal').showModal();
}

const displayLabelWord = (words) => {
  const wordContainer = document.getElementById('word-container');
  wordContainer.innerHTML = "";

  if (words.length === 0) {
    wordContainer.innerHTML = `
      <div class="col-span-full text-center py-10 space-y-3">
        <img class="mx-auto" src="./assets/alert-error.png">
        <p class="text-xl font-medium text-[#79716B] font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-semibold text-6xl font-bangla">অন্য Lesson এ যান</h2>
      </div>
    `;
    return;
  }

  words.forEach(word => {
    const card = document.createElement('div');
    card.innerHTML = `
      <div class="bg-white rounded-xl shadow-sm text-center py-8 px-5 space-y-4">
        <h2 class="font-bold text-2xl">${word.word ? word.word : 'Word Not Found!'}</h2>
        <p class="font-semibold">Meaning / Pronunciation</p>
        <div class="text-2xl font-medium font-bangla">${word.meaning ? word.meaning : 'Meaning Not Found'} / ${word.pronunciation ? word.pronunciation : 'Pronunciation not found'}</div>
        <div class="flex justify-between items-center mt-4">
          <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
    `;
    wordContainer.append(card);
  })
}

const displayLessons = (lessons) => {
  const labelContainer = document.getElementById('label-container');
  labelContainer.innerHTML = '';

  for (let lesson of lessons) {
    const btnDiv = document.createElement('div');
    btnDiv.innerHTML = `
      <button id="lebel-btn-${lesson.level_no}" onClick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary mb-5 lesson-btn">
        <i class="fa-solid fa-book-open"></i> Lesson -${lesson.level_no}
      </button>
    `;
    labelContainer.append(btnDiv);
  }
}

loadLessons();