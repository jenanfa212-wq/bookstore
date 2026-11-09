import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import books from "../../data/books";
import "./Discover.css";

const moodOptions = [
    {
        id: "emotional",
        label: "Emotional stories",
        hint: "Heartfelt and human",
    },
    {
        id: "escape",
        label: "Escape into another world",
        hint: "Wonder, fantasy, adventure",
    },
    {
        id: "growth",
        label: "Personal growth",
        hint: "Practical, reflective, uplifting",
    },
    {
        id: "intriguing",
        label: "Something intriguing",
        hint: "A little different, a little daring",
    },
];

const genreOptions = [
    { id: "Fiction", label: "Fiction" },
    { id: "Fantasy", label: "Fantasy" },
    { id: "Memoir", label: "Memoir" },
    { id: "Self-Development", label: "Self-Development" },
];

const readingStyleOptions = [
    {
        id: "easy",
        label: "Short and easy",
        hint: "Light and easy to enjoy",
    },
    {
        id: "inspiring",
        label: "Inspiring and practical",
        hint: "Thoughtful and motivating",
    },
    {
        id: "immersive",
        label: "Deep and immersive",
        hint: "A rich, absorbing read",
    },
];

const budgetOptions = [
    { id: "16", label: "Up to 16 LYD", max: 16 },
    { id: "18", label: "Up to 18 LYD", max: 18 },
    { id: "20", label: "Up to 20 LYD", max: 20 },
    { id: "22", label: "Up to 22 LYD", max: 22 },
    { id: "any", label: "Any budget", max: 999 },
];

const stepOrder = ["mood", "genre", "style", "budget"];

const formatBudget = (value) => `${value} LYD`;

function getBestMatchReason(book, answers) {
    const reasons = [];

    if (answers.genre && book.category === answers.genre) {
        reasons.push(`Matches your ${answers.genre.toLowerCase()} preference.`);
    }

    if (answers.mood === "escape" && book.category === "Fantasy") {
        reasons.push("This is a strong escape pick with imaginative energy.");
    }

    if (answers.mood === "growth" && book.category === "Self-Development") {
        reasons.push("This fits your personal growth mood.");
    }

    if (answers.mood === "emotional" && book.category === "Fiction") {
        reasons.push("This leans toward the emotionally resonant stories you selected.");
    }

    if (answers.mood === "intriguing" && (book.category === "Memoir" || book.category === "Fiction")) {
        reasons.push("This offers a more intriguing, thought-provoking read.");
    }

    if (answers.style === "easy" && (book.category === "Fiction" || book.category === "Fantasy")) {
        reasons.push("It suits a lighter, more enjoyable reading rhythm.");
    }

    if (answers.style === "inspiring" && book.category === "Self-Development") {
        reasons.push("It matches your inspiring and practical reading style.");
    }

    if (answers.style === "immersive" && (book.category === "Fiction" || book.category === "Memoir" || book.category === "Fantasy")) {
        reasons.push("It suits a deeper, more immersive reading experience.");
    }

    if (answers.budget && Number(book.price) <= Number(answers.budget)) {
        reasons.push(`It fits your ${formatBudget(Number(answers.budget))} budget.`);
    }

    return reasons.length ? reasons[0] : "A strong choice from the current catalog.";
}

function getRecommendationScore(book, answers) {
    let score = 0;

    if (answers.genre && book.category === answers.genre) score += 8;
    if (answers.genre && book.category !== answers.genre) score += 1;

    if (answers.mood === "escape" && book.category === "Fantasy") score += 5;
    if (answers.mood === "growth" && book.category === "Self-Development") score += 5;
    if (answers.mood === "emotional" && book.category === "Fiction") score += 4;
    if (answers.mood === "intriguing" && (book.category === "Memoir" || book.category === "Fiction")) score += 3;

    if (answers.style === "easy" && (book.category === "Fiction" || book.category === "Fantasy")) score += 3;
    if (answers.style === "inspiring" && book.category === "Self-Development") score += 5;
    if (answers.style === "immersive" && (book.category === "Fiction" || book.category === "Memoir" || book.category === "Fantasy")) score += 4;

    if (answers.budget) {
        const price = Number(book.price);
        const limit = Number(answers.budget);
        if (price <= limit) score += 4;
        else score -= 2;
    }

    if (answers.genre && book.category === answers.genre) score += 2;

    return score;
}

function Discover({ addToCart }) {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({
        mood: "",
        genre: "",
        style: "",
        budget: "",
    });
    const [showResults, setShowResults] = useState(false);

    const activeStep = stepOrder[step];
    const progressPercent = ((step + 1) / stepOrder.length) * 100;

    const optionsMap = {
        mood: moodOptions,
        genre: genreOptions,
        style: readingStyleOptions,
        budget: budgetOptions,
    };

    const selectedValue = answers[activeStep];

    const recommendationList = useMemo(() => {
        const scoredBooks = books
            .map((book) => ({
                ...book,
                score: getRecommendationScore(book, answers),
                reason: getBestMatchReason(book, answers),
            }))
            .sort((a, b) => b.score - a.score || Number(a.price) - Number(b.price));

        const budgetLimit = answers.budget ? Number(answers.budget) : Number.MAX_SAFE_INTEGER;
        const results = scoredBooks.filter((book) => Number(book.price) <= budgetLimit);

        if (results.length > 0) {
            return results.slice(0, 3);
        }

        return scoredBooks.slice(0, 3);
    }, [answers]);

    const updateAnswer = (value) => {
        setAnswers((current) => ({ ...current, [activeStep]: value }));
    };

    const goNext = () => {
        if (!selectedValue) return;

        if (step < stepOrder.length - 1) {
            setStep((current) => current + 1);
            return;
        }

        setShowResults(true);
    };

    const goBack = () => {
        if (step > 0) {
            setStep((current) => current - 1);
        }
    };

    const resetFinder = () => {
        setAnswers({ mood: "", genre: "", style: "", budget: "" });
        setShowResults(false);
        setStep(0);
    };

    const surpriseMe = () => {
        const randomBook = books[Math.floor(Math.random() * books.length)];
        setShowResults(true);
        setAnswers({
            mood: "intriguing",
            genre: randomBook.category,
            style: "immersive",
            budget: String(Math.max(...books.map((book) => Number(book.price)))),
        });
        setStep(stepOrder.length - 1);
    };

    const currentStepConfig = {
        mood: {
            title: "What feeling are you in the mood for?",
            subtitle: "Choose the atmosphere that suits your next read.",
        },
        genre: {
            title: "Pick your preferred genre",
            subtitle: "We’ll match it to the books currently available.",
        },
        style: {
            title: "How do you want to read?",
            subtitle: "Your reading rhythm matters for the perfect pick.",
        },
        budget: {
            title: "Choose your comfort budget",
            subtitle: "We’ll keep the recommendations within your range.",
        },
    };

    const currentQuestion = currentStepConfig[activeStep];

    return (
        <main className="discover-page">
            <section className="discover-hero">
                <p className="discover-kicker">DISCOVER</p>
                <h1>Your next chapter starts here.</h1>
                <p className="discover-subtitle">
                    Answer a few quick questions and we’ll suggest books from the current library that fit your mood, pace, and budget.
                </p>
            </section>

            {!showResults ? (
                <section className="discover-finder" aria-live="polite">
                    <div className="discover-progress">
                        <div className="discover-progress-bar" style={{ width: `${progressPercent}%` }} />
                    </div>

                    <div className="discover-step-meta">
                        <span>Step {step + 1} of {stepOrder.length}</span>
                    </div>

                    <h2>{currentQuestion.title}</h2>
                    <p>{currentQuestion.subtitle}</p>

                    <div className="discover-options">
                        {optionsMap[activeStep].map((option) => {
                            const isSelected = selectedValue === option.id || selectedValue === option.label;

                            return (
                                <button
                                    key={option.id}
                                    type="button"
                                    className={`discover-option ${isSelected ? "selected" : ""}`}
                                    onClick={() => updateAnswer(option.id)}
                                    aria-pressed={isSelected}
                                >
                                    <span>{option.label}</span>
                                    {option.hint && <small>{option.hint}</small>}
                                </button>
                            );
                        })}
                    </div>

                    <div className="discover-actions">
                        <button type="button" className="discover-secondary" onClick={goBack} disabled={step === 0}>
                            Back
                        </button>

                        <button type="button" className="discover-primary" onClick={goNext} disabled={!selectedValue}>
                            {step === stepOrder.length - 1 ? "See My Picks" : "Continue"}
                        </button>
                    </div>
                </section>
            ) : (
                <section className="discover-results" aria-live="polite">
                    <div className="results-heading-row">
                        <div>
                            <p className="discover-kicker">YOUR NEXT READ</p>
                            <h2>Curated for your mood and budget</h2>
                        </div>

                        <div className="results-actions">
                            <button type="button" className="discover-secondary" onClick={resetFinder}>
                                Try Again
                            </button>
                            <button type="button" className="discover-primary" onClick={surpriseMe}>
                                Surprise Me
                            </button>
                        </div>
                    </div>

                    <p className="discover-summary">
                        Based on your current mood, genre, reading style, and budget, these are the closest matches from the books currently available.
                    </p>

                    <div className="discover-results-grid">
                        {recommendationList.map((book) => (
                            <article className="discover-result-card" key={book.id}>
                                <img src={book.image} alt={book.title} />

                                <div className="discover-result-body">
                                    <h3>{book.title}</h3>
                                    <p className="discover-author">{book.author}</p>
                                    <p className="discover-price">{book.price} LYD</p>
                                    <p className="discover-match">{book.reason}</p>

                                    <div className="discover-result-actions">
                                        <Link to={`/book/${book.id}`} className="discover-link-button">
                                            View Details
                                        </Link>
                                        <button type="button" className="discover-cart-button" onClick={() => addToCart(book)}>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}

export default Discover;
