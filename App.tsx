import React, { useState, useMemo } from 'react';
import { ArrowRight, Check, ChevronRight, RefreshCcw, Users, BarChart2, Lock, MessageSquareQuote } from 'lucide-react';
import { QUESTIONS, RESULT_TYPES } from './constants';
import { Question, UserAnswers, TypeDefinition } from './types';

// --- Components ---

const LandingPage: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-2 bg-ud-primary"></div>
    <div className="max-w-xl w-full text-center z-10">
      <div className="mb-6 inline-block">
        <span className="bg-ud-primary/10 text-ud-primary px-3 py-1 rounded-full text-sm font-bold tracking-wide">
          UNDERDOGS SURVIVORS
        </span>
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold text-ud-dark mb-6 leading-tight">
        스타트업 문제<br/>
        <span className="text-ud-primary">MBTI 테스트</span>
      </h1>
      <p className="text-gray-600 text-lg md:text-xl mb-10 leading-relaxed">
        지금 우리 스타트업은 어떤 문제 성향을 가지고 있을까요?<br className="hidden md:block" />
        3분 만에 문제의 본질을 진단하고 솔루션을 찾으세요.
      </p>
      
      <button 
        onClick={onStart}
        className="w-full md:w-auto bg-ud-dark text-white px-8 py-4 rounded-xl text-xl font-bold hover:bg-black transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2 mx-auto"
      >
        진단 시작하기 <ArrowRight className="w-6 h-6" />
      </button>

      <div className="mt-12 text-sm text-gray-400">
        UD Type Check Beta v1.0
      </div>
    </div>
    
    {/* Background Decorative Elements */}
    <div className="absolute top-10 right-0 w-64 h-64 bg-ud-gray rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
    <div className="absolute bottom-10 left-0 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
  </div>
);

const QuizPage: React.FC<{ 
  questions: Question[], 
  onComplete: (answers: UserAnswers) => void 
}> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnswer = (value: string) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const newAnswers = { ...answers, [questions[currentIndex].id]: value };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setIsAnimating(false);
      } else {
        onComplete(newAnswers);
      }
    }, 300);
  };

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="h-2 bg-gray-200 w-full">
        <div 
          className="h-full bg-ud-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="px-6 py-4 flex justify-between text-sm font-semibold text-gray-500">
        <span>Q{currentIndex + 1}</span>
        <span>{questions.length}</span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6 max-w-2xl mx-auto w-full pb-20">
        <h2 className={`text-2xl md:text-3xl font-bold text-ud-dark mb-12 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          {currentQuestion.question}
        </h2>

        <div className="space-y-4">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option.value)}
              className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-200 group
                ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
                border-gray-200 bg-white hover:border-ud-primary hover:bg-orange-50 active:scale-[0.98]
              `}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg text-gray-800 font-medium group-hover:text-ud-dark">
                  {option.label}
                </span>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-ud-primary" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ResultCard: React.FC<{ type: TypeDefinition, isMain?: boolean }> = ({ type, isMain = false }) => (
  <div className={`bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 ${isMain ? 'w-full' : 'w-[85vw] md:w-[400px] shrink-0'}`}>
    {/* Header */}
    <div className="bg-ud-dark p-8 md:p-10 text-white relative overflow-hidden">
      <div className="absolute top-[-20px] right-[-20px] opacity-10 pointer-events-none">
        <span className="text-[10rem] font-black leading-none">{type.code}</span>
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
           <span className="inline-block px-3 py-1 bg-ud-primary text-white rounded-full text-xs font-bold tracking-wider uppercase">
            Problem Type
          </span>
        </div>
        <h1 className="text-6xl md:text-7xl font-black mb-4 tracking-tighter leading-none">
          {type.code}
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-3">{type.name}</h2>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed opacity-90 max-w-lg">
          {type.shortDesc}
        </p>
      </div>
    </div>
    
    <div className="p-6 md:p-8 space-y-8">
      {/* Signs */}
      <div>
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
          <BarChart2 className="w-4 h-4" /> 전형적인 신호
        </h3>
        <ul className="space-y-2">
          {type.signs.map((sign, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700 text-sm md:text-base">
              <span className="text-red-500 mt-1 shrink-0">⚠️</span>
              {sign}
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div>
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
          <Check className="w-4 h-4" /> 지금 필요한 액션
        </h3>
        <ul className="space-y-3">
          {type.actions.map((action, i) => (
            <li key={i} className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
              <div className="w-5 h-5 rounded-full bg-ud-dark text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {i + 1}
              </div>
              <span className="text-gray-800 text-sm font-medium">{action}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Secret Mentor Section */}
      {isMain && (
        <div className="relative mt-8 rounded-xl overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900"></div>
           <div className="relative p-6">
              <div className="flex items-center gap-3 mb-4 border-b border-slate-700 pb-3">
                 <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-ud-primary" />
                 </div>
                 <div>
                    <p className="text-ud-primary text-xs font-bold uppercase tracking-wider">Secret Mentor의 진단</p>
                    <p className="text-white font-bold text-sm">{type.secretMentor.name} <span className="text-slate-400 text-xs font-normal">| {type.secretMentor.role}</span></p>
                 </div>
              </div>
              <div className="flex gap-3">
                <MessageSquareQuote className="w-8 h-8 text-slate-600 shrink-0 transform flip-x" />
                <p className="text-slate-200 text-sm leading-relaxed italic">
                   {type.secretMentor.comment}
                </p>
              </div>
           </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="pt-6 border-t border-gray-100">
        <div className="bg-orange-50 border border-orange-100 p-5 rounded-xl mb-5">
           <p className="text-ud-dark font-bold text-base md:text-lg mb-2 leading-snug">
              {type.code} 타입 대표님,
           </p>
           <p className="text-gray-700 text-sm leading-relaxed">
             {type.ctaCopy}
           </p>
        </div>
        <button className="w-full bg-ud-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-red-600 transition-all shadow-lg shadow-orange-200 flex items-center justify-center gap-2 group">
          {type.code} 솔루션 받으러 가기
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  </div>
);

const ResultPage: React.FC<{ 
  resultType: TypeDefinition, 
  onRetest: () => void 
}> = ({ resultType, onRetest }) => {
  const otherTypes = useMemo(() => 
    RESULT_TYPES.filter(t => t.code !== resultType.code), 
  [resultType]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white sticky top-0 z-50 border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <span className="font-bold text-ud-dark tracking-tight">UD TYPE CHECK</span>
        <button onClick={onRetest} className="text-sm text-gray-500 hover:text-ud-primary flex items-center gap-1">
          <RefreshCcw className="w-3 h-3" /> 다시하기
        </button>
      </header>

      <main className="max-w-3xl mx-auto pt-8 px-4 md:px-0">
        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1 bg-gray-200 rounded-full text-xs font-bold text-gray-600 mb-2">Result</span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">당신의 스타트업 문제 유형은?</h2>
        </div>
        
        {/* Main Result */}
        <div className="mb-16">
          <ResultCard type={resultType} isMain={true} />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8 px-4">
          <div className="h-px bg-gray-300 flex-1"></div>
          <span className="text-gray-400 text-sm font-medium flex items-center gap-2">
            <Users className="w-4 h-4" /> 다른 유형 구경하기
          </span>
          <div className="h-px bg-gray-300 flex-1"></div>
        </div>

        {/* Horizontal Scroll / Carousel */}
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-4 overflow-x-auto px-4 pb-8 hide-scrollbar snap-x snap-mandatory">
            {otherTypes.map((type) => (
              <div key={type.code} className="snap-center">
                <ResultCard type={type} />
              </div>
            ))}
          </div>
          {/* Gradient indicators for scroll */}
          <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none md:hidden"></div>
          <div className="absolute top-0 left-0 h-full w-4 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none md:hidden"></div>
        </div>
        
        {/* Final CTA */}
        <div className="mt-8 px-4 text-center">
          <p className="text-gray-600 mb-4">
            혼자 고민하면 벅차지만, 함께하면 전략이 됩니다.<br/>
            언더독스 서바이버즈에서 동료를 만나세요.
          </p>
          <button className="text-ud-primary font-bold border-b-2 border-ud-primary hover:text-ud-dark hover:border-ud-dark transition-colors pb-1">
            전체 프로그램 자세히 보기 →
          </button>
        </div>
      </main>
    </div>
  );
};

// --- Main App Logic ---

function App() {
  const [screen, setScreen] = useState<'landing' | 'quiz' | 'result'>('landing');
  const [resultType, setResultType] = useState<TypeDefinition>(RESULT_TYPES[0]);

  const calculateResult = (answers: UserAnswers) => {
    // Simple counter logic
    const counts = { I: 0, E: 0, P: 0, M: 0, T: 0, S: 0, Ear: 0, Sca: 0 };
    
    // Axis 1: I vs E
    if (answers[1] === 'I') counts.I++; else counts.E++;
    if (answers[2] === 'I') counts.I++; else counts.E++;
    const res1 = counts.I >= counts.E ? 'I' : 'E';

    // Axis 2: P vs M
    if (answers[3] === 'P') counts.P++; else counts.M++;
    if (answers[4] === 'P') counts.P++; else counts.M++;
    const res2 = counts.P >= counts.M ? 'P' : 'M';

    // Axis 3: T vs S
    if (answers[5] === 'T') counts.T++; else counts.S++;
    if (answers[6] === 'T') counts.T++; else counts.S++;
    const res3 = counts.T >= counts.S ? 'T' : 'S';

    // Axis 4: E vs S (Early vs Scale)
    // Using Ear/Sca to distinguish from S in system
    if (answers[7] === 'E') counts.Ear++; else counts.Sca++;
    if (answers[8] === 'E') counts.Ear++; else counts.Sca++;
    const res4 = counts.Ear >= counts.Sca ? 'E' : 'S';

    const code = `${res1}${res2}${res3}${res4}`;
    
    // Find closest match or default
    // For MVP, we map to the 4 defined types if exact match fails
    // Prioritizing logic: if not found, default to IPTE for demo
    const found = RESULT_TYPES.find(t => t.code === code);
    if (found) return found;

    // Fallback logic for demo purposes (mapping combinations to nearest defined types)
    // E.g., if code is IPSS -> map to EPSS
    if (code.endsWith('SS')) return RESULT_TYPES.find(t => t.code === 'EMSS') || RESULT_TYPES[1];
    if (code.startsWith('I')) return RESULT_TYPES.find(t => t.code === 'IPTE') || RESULT_TYPES[0];
    
    return RESULT_TYPES[0];
  };

  const handleQuizComplete = (answers: UserAnswers) => {
    const type = calculateResult(answers);
    setResultType(type);
    setScreen('result');
    window.scrollTo(0,0);
  };

  return (
    <div className="font-sans text-gray-900 antialiased">
      {screen === 'landing' && (
        <LandingPage onStart={() => setScreen('quiz')} />
      )}
      {screen === 'quiz' && (
        <QuizPage questions={QUESTIONS} onComplete={handleQuizComplete} />
      )}
      {screen === 'result' && (
        <ResultPage 
          resultType={resultType} 
          onRetest={() => {
            setScreen('landing');
            window.scrollTo(0,0);
          }} 
        />
      )}
    </div>
  );
}

export default App;