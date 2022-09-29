import React from 'react';
import './index.scss';

const questions = [
  {
    title: 'Куда на курортных пляжах просят не заплывать отдыхающих?',
    variants: ['За горизонт', 'За буйки', 'За границу', 'В камыши'],
    correct: 1,
  },
  {
    title: 'При падении чего принято загадывать желание?',
    variants: ['Температуры', 'Дисциплины', 'Звезды', 'Курса рубля'],
    correct: 2,
  },
  {
    title: 'В роли какого автомобильного устройства выступает по отношению к торговле реклама?',
    variants: ['Зажигания', 'Двигателя', 'Глушителя', 'Тормоза'],
    correct: 1,
  },
  {
    title: 'Какой рубрики в разделе объявлений не существует?',
    variants: ['Куплю', 'Продам', 'Обую', 'Сниму'],
    correct: 2,
  },
  {
    title: 'Как благодарные сограждане окрестили период брежневского правления?',
    variants: ['Простой', 'Застой', 'Перестой', 'Отстой'],
    correct: 1,
  },
  {
    title: 'Что показывает судья футболисту, делая предупреждение?',
    variants: ['Паспорт', 'Желтую карточку', 'Бюллетень', 'Язык'],
    correct: 1,
  },
  {
    title: 'Какое из этих животных чаще всего подвержено бреду?',
    variants: ['Лапчатый гусь', 'Сивая кобыла', 'Дареный конь', 'Злая собака'],
    correct: 1,
  },
  {
    title: 'Какой запрет реже всего нарушают российские граждане?',
    variants: ['Не курить!', 'Соблюдайте очередь!', 'Вход - по пропускам!', 'Не влезай, убьет!'],
    correct: 3,
  },
  {
    title: 'Как в народе называют финансовые институты обещающие "золотые горы"?',
    variants: ['Пирамиды', 'Сфинксы', 'Гробницы', 'Захоронения'],
    correct: 0,
  },
  {
    title: 'Как называлась первая российская марксистская нелегальная газета?',
    variants: ['Зажигалка', 'Спичка', 'Искра', 'Коктейль Молотова'],
    correct: 2,
  },
];

function Begin({ onClickBegin }) {
  return (
    <div className="begin">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" alt="" />
      <h1>Шуточный тест</h1>
      <div className="footer-buttons">
        <button onClick={onClickBegin}>Начать тест</button>
      </div>
    </div>
  );
}

function Result({ correct }) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" alt="" />
      <h2>
        Вы отгадали {correct} из {questions.length}
      </h2>
      <a href="/">
        <button>Попробовать снова</button>
      </a>
    </div>
  );
}

function Game({ step, question, choice, onClickChoice, onClickNext }) {
  const percentage = Math.round((step / questions.length) * 100);

  return (
    <div className="step">
      <div className="progress">
        <div style={{ width: `${percentage}%` }} className="progress__inner"></div>
      </div>
      <h2>{question.title}</h2>
      <ul>
        {question.variants.map((text, index) => {
          let cssClass = '';
          let textSpan = '';
          if (choice >= 0) {
            if (index === question.correct) {
              cssClass = 'correct';
              textSpan = 'Правильно!';
            } else if (index === choice) {
              cssClass = 'error';
              textSpan = 'Неправильно!';
            }
          }
          return (
            <li key={text} className={cssClass} onClick={() => onClickChoice(index)}>
              {text}
              <span>{textSpan}</span>
            </li>
          );
        })}
      </ul>
      <div className="step__row-btn">
        <button onClick={() => onClickNext(choice)}>Далее</button>
      </div>
    </div>
  );
}

function App() {
  const [step, setStep] = React.useState(-1);
  const [correct, setCorrect] = React.useState(0);
  const [choice, setChoice] = React.useState(-1);
  const question = questions[step];

  const onClickBegin = () => {
    setStep(0);
  };

  const onClickChoice = (index) => {
    setChoice(index);
  };

  const onClickNext = (index) => {
    setStep(step + 1);
    if (index === question.correct) {
      setCorrect(correct + 1);
    }
    setChoice(-1);
  };

  let stepRender;
  if (step === -1) {
    stepRender = <Begin onClickBegin={onClickBegin} />;
  } else if (step !== questions.length) {
    stepRender = (
      <Game
        step={step}
        question={question}
        choice={choice}
        onClickChoice={onClickChoice}
        onClickNext={onClickNext}
      />
    );
  } else {
    stepRender = <Result correct={correct} />;
  }

  return <div className="App">{stepRender}</div>;
}

export default App;
