import { useEffect, useState } from 'react';
import axios from "axios"
import TextareaAutosize from 'react-textarea-autosize';
import { Toaster } from 'react-hot-toast';
import Popover from "../components/Popover/Popover2"
import { useAuth0 } from '@auth0/auth0-react';
import { getSimilarItems } from 'util/e_util';
import { getSimilarMedicalPapers } from 'util/bioarXiv_util'
import Select from 'react-dropdown-select';
import Loader from "../components/Loader/Loader"

const Instruct = () => {
    const [loading, setLoading] = useState(false);

    const [query, setQuery] = useState("");
    const [similar_papers, setSimilarPapers] = useState([]);

    const [medical_query, setMedicalQuery] = useState("");
    const [similar_medical_papers, setSimilarMedicalPapers] = useState([]);

    const [search_medical, setSearchMedical] = useState(false);

    const [bioarXiv_categories] = useState([
        { label: 'Cardiology', value: 'Cardiology' },
        { label: 'Dermatology', value: 'Dermatology' },
        { label: 'Endocrinology', value: 'Endocrinology' },
        { label: 'Gastroenterology', value: 'Gastroenterology' },
        { label: 'Hematology', value: 'Hematology' },
        { label: 'Infectious Diseases', value: 'Infectious Diseases' },
        { label: 'Medical Education', value: 'Medical Education' },
        { label: 'Nephrology', value: 'Nephrology' },
        { label: 'Neurology', value: 'Neurology' },
        { label: 'Oncology', value: 'Oncology' },
        { label: 'Ophthalmology', value: 'Ophthalmology' },
        { label: 'Orthopedics', value: 'Orthopedics' },
        { label: 'Pain Medicine', value: 'Pain Medicine' },
        { label: 'Pathology', value: 'Pathology' },
        { label: 'Pediatrics', value: 'Pediatrics' },
        { label: 'Pharmacology and Therapeutics', value: 'Pharmacology and Therapeutics' },
        { label: 'Psychiatry and Clinical Psychology', value: 'Psychiatry and Clinical Psychology' },
        { label: 'Radiology and Imaging', value: 'Radiology and Imaging' },
        { label: 'Respiratory Medicine', value: 'Respiratory Medicine' },
        { label: 'Surgery', value: 'Surgery' },
        { label: 'Urology', value: 'Urology' },
        { label: 'Vascular Medicine', value: 'Vascular Medicine' },
    ]);
    const [selected_bioarXiv_categories, setSelectedBioarXivCategories] = useState([]);
    const [show_bio_filters, setShowBioFilters] = useState(false);

    // const [formatted_bio_references, setFormattedBioReferences] = useState([]);

    useEffect(() => {
        // get the path of the current page
        let path = window.location.pathname

        // if query_parameter = "medical" then set search_medical to true
        if (path.includes("medical")) {
            setSearchMedical(true)
        }
    }, [])

    const { user } = useAuth0();

    // this function is useful in getting the embeddings from the backend
    async function getEmbeddings(query) {
        try {
            const response = await axios.post('/api/e_work', {
                prompt: query
            });
            const data = response.data;
            return data;
        }
        catch (error) {
            console.log(error);
        }
    }

    // this function gets the papers whose title and abstract embedding is most similar to the query provided.
    const fetchPapers = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSimilarPapers([])

        // get the embeddings of the query from the backend
        let embeddings = await getEmbeddings(query)

        // get the top 5 similar papers from the database
        let similar_papers = await getSimilarItems(embeddings.data[0].embedding)
        setSimilarPapers(similar_papers)
        formatAsCitations(similar_papers)
        setLoading(false)
    }

    // this function fetches the bioarxiv papers most simiar to the query entered
    const fetchMedicalPapers = async (e) => {
        e.preventDefault();
        if (medical_query === "") {
            alert("Please enter a query")
            return
        }
        setLoading(true);
        setSimilarMedicalPapers([])

        // get the embeddings of the query from the backend
        let embeddings = await getEmbeddings(medical_query)

        // get the top 5 similar papers from the database
        let similar_papers = await getSimilarMedicalPapers(embeddings.data[0].embedding)
        setSimilarMedicalPapers(similar_papers)
        console.log("similar_papers: ", similar_papers)
        // if the user has selected a category then filter the papers by the category
        if (selected_bioarXiv_categories !== []) {
            let filtered_papers = similar_papers.filter(paper => {
                // lowercase the category
                let category = selected_bioarXiv_categories.toLowerCase()
                // if the category is in the paper's categories then return the paper
                if (paper.category === category) {
                    return paper
                }
            })
            setSimilarMedicalPapers(filtered_papers)
            window.analytics.track('Medical Paper Search', {
                query: medical_query,
                category: selected_bioarXiv_categories,
                similar_papers: String(similar_papers),
                user: user !== null ? user.email : "anonymous",
            })

        } else {
            setSimilarMedicalPapers(similar_papers)
        }
        setLoading(false)
    }

    // this function formats the papers in the exmaple format shown below
    // S. Urazhdin, N. O. Birge, W. P. Pratt Jr., and J. Bass, “Current-driven magnetic excitations in permalloybased multilayer nanopillars,” 2003. [Online]. Available: arXiv:cond-mat/0303149.
    const formatAsCitations = (papers) => {
        let formatted_papers = papers.map(paper => {
            let citation = paper.authors + ", “" + paper.title + ",” " + paper.date + ". [Online]. Available: " + paper.item_url || paper.link
            return citation
        })
        console.log("papers: ", papers)
        console.log("formatted_papers: ", formatted_papers)
        return formatted_papers
    }


    return (
        <>
            {!search_medical &&
                <div className="relative md:pt-0 pb-128 pt-12"
                    style={{
                        backgroundColor: "#FBF5DF",
                        // height should be minus the height of the screen and stretch to fill the screen when more content is added
                        height: "400vh",
                    }}
                >
                    <Toaster />
                    <div className="flex-auto px-5 pt-5 pb-0 lg:px-10">
                        <div className="relative w-full mb-0">
                            <div
                                className="flex-auto px-5 pt-5 pb-0 p-5"
                            >
                                <div className="text-center mt-6">
                                    <h1
                                        className="text-3xl font-semibold rubik-font text-dark"
                                    >
                                        Sci Paper Recommender
                                        <span className="text-xs text-gray-500">beta</span>
                                    </h1>
                                    <p
                                        className="text-lg leading-relaxed mt-4 mb-4 text-dark"
                                    >
                                        AI powered research paper recommender
                                    </p>
                                    {/* small toggle switch to setSearchMedical to true */}
                                    <div className="flex flex-wrap justify-center items-center ">
                                        <p className="text-dark text-xs font-bold mr-2">
                                           Search Health Sciences
                                        </p>
                                        <input
                                            type="checkbox"
                                            className="form-checkbox h-5 w-5 text-dark"
                                            id="medical"
                                            name="medical"
                                            checked={search_medical}
                                            onChange={() => {
                                                setSearchMedical(!search_medical)
                                            }}
                                        />
                                    </div>
                                    <div
                                        // 1/3 width on big screens, full width on small screens
                                        className="w-full lg:w-1/3 px-4"
                                    >
                                        <Popover
                                            Question="Examples, Capabilites & Limitations"
                                        />
                                    </div>
                                    <div className="flex flex-wrap justify-center">
                                        {/* add a search icon and attach it to the text area */}
                                        <TextareaAutosize
                                            type="text"
                                            placeholder="What's your research query?"
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            className="text-center border-0 mx-4 px-3 py-2 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 mx-auto w-8/12"
                                            autoFocus
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    fetchPapers(e)
                                                }
                                            }}
                                        />
                                    </div>
                                    {loading ?
                                        <div>
                                            <Loader message="Fetching Papers..." color="res" />
                                            <p className="text-dark text-xsm">
                                                This may take 15-20 Seconds. Please Wait.
                                            </p>
                                        </div>
                                        :
                                        <button
                                            className="text-white active:bg-gold-600 font-bold uppercase text-sm px-6 py-3 my-4 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-3/12"
                                            onClick={fetchPapers}
                                            type="submit"
                                            style={{
                                                backgroundColor: "#343a40",
                                            }}
                                        >
                                            Find Papers {" "}
                                            <i className="fas fa-search"></i>
                                        </button>
                                    }
                                    {/* a row with the similar_paper cards showing */}
                                    <div className="flex flex-wrap justify-center">
                                        {
                                            // similar_papers.length > 0 &&
                                            similar_papers.map((paper, index) => (
                                                <div className="w-full lg:w-4/12 px-4" key={index}
                                                    onClick={() => {
                                                        window.open(paper.link, "_blank")
                                                    }}
                                                >
                                                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-lightGray-700">
                                                        <div className="flex-auto p-5 lg:px-10">
                                                            <h4 className="text-lg font-semibold text-white">
                                                                {paper.title}
                                                            </h4>
                                                            {/* row with 2 columns */}
                                                            <div className="flex flex-wrap text-center">
                                                                <div className="w-6/12 px-4">
                                                                    <p className="text-xsm leading-relaxed mt-4 mb-4 text-emerald-500 text-left">
                                                                        <span className="text-white">Authors: </span>
                                                                        {paper.authors.split(",")[0]} {paper.authors.split(",").length > 1 &&
                                                                            paper.authors.split(",")[1] + "..."
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="w-5/12 px-4">
                                                                    <p className="text-xsm leading-relaxed mt-4 mb-4 text-emerald-500 text-left">
                                                                        {paper.similarity.toFixed(2) * 100}%
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <p className="text-xsm leading-relaxed mt-4 mb-4 text-white text-left">
                                                                {paper.abstract.slice(0, 200) + "..."}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="fixed bottom-0 right-0 mb-4 mr-4">
                        <a href="https://www.buymeacoffee.com/rookih.com" target="_blank" rel="noreferrer">
                            <button
                                className="text-white bg-gold text-xsm px-4 py-2 my-4 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="submit"
                                style={{
                                    backgroundColor: "#343a40",
                                }}
                            >
                                <i className="fas fa-coffee"></i> {" "}
                                {/* <br /> */}
                                <span className='text-xsm my-0 py-0' >Buy Me A Coffee?</span>
                            </button>
                        </a>
                    </div>
                </div >
            }
            {search_medical &&
                <div className="relative md:pt-0 pb-128 pt-6 bg-black"
                    style={{
                        backgroundColor: "#FBF5DF",
                        // height should be minus the height of the screen and stretch to fill the screen when more content is added
                        height: "400vh",
                    }}
                >
                    <div className="flex-auto px-5 pt-5 pb-0 lg:px-10">
                        <div className="relative w-full mb-0">
                            <div
                                className="flex-auto px-5 pt-5 pb-0 p-5"
                            >
                                <div className="text-center mt-6">
                                    <h1
                                        className="text-3xl font-semibold rubik-font text-dark"
                                    >
                                        Rookih Research<span className="text-xs text-gray-500">beta</span>
                                        <br />
                                        Health Sciences
                                    </h1>
                                    <p
                                        className="text-lg leading-relaxed mt-4 mb-4 text-dark"
                                    >
                                        AI powered research paper recommender
                                    </p>
                                </div>
                                <div className="flex flex-wrap justify-center">
                                    <p className="text-dark text-xs font-bold mr-2">
                                        Health Sciences?
                                    </p>
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-dark bg-dark"
                                        id="medical"
                                        name="medical"
                                        checked={search_medical}
                                        onChange={() => {
                                            setSearchMedical(!search_medical)
                                        }}
                                    />
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="fixed bottom-0 right-0 mb-4 mr-4">
                        <a href="https://www.buymeacoffee.com/rookih.com" target="_blank" rel="noreferrer">
                            <button
                                className="text-white bg-gold text-xsm px-4 py-2 my-4 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="submit"
                                style={{
                                    backgroundColor: "#343a40",
                                }}
                            >
                                <i className="fas fa-coffee"></i> {" "}
                                {/* <br /> */}
                                <span className='text-xsm my-0 py-0' >Buy Me A Coffee?</span>
                            </button>
                        </a>
                    </div>
                    <div className="flex flex-wrap justify-center">
                        <input
                            type="text"
                            placeholder="What's your research query?"
                            value={medical_query}
                            onChange={(e) => setMedicalQuery(e.target.value)}
                            className="text-center border-0 mx-4 px-3 py-2 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 mx-auto w-8/12"
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    fetchMedicalPapers(e)
                                }
                            }}
                        />
                    </div>
                    {show_bio_filters &&
                        <div
                            className={"flex flex-wrap justify-center text-center items-center mt-2" +
                                (show_bio_filters ? " fade-in" : " hidden")
                                // fade out if show_bio_filters is false
                                + (show_bio_filters ? "" : " fade-out")
                            }
                        >
                            <Select
                                className="text-center border-0 mx-4 px-3 mx-3 py-2 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 mx-auto w-8/12"
                                hidden={!show_bio_filters}
                                options={bioarXiv_categories}
                                onChange={(e) => {
                                    setSelectedBioarXivCategories(e[0].value)
                                }}
                                value={selected_bioarXiv_categories}
                            />
                        </div>
                    }
                    <div className={
                        "flex flex-wrap justify-center text-center items-center" +
                        (show_bio_filters && " move-down")
                    }
                    >
                        {loading ?
                            <div>
                                <Loader message="Fetching Papers..." color="res" />
                                <p className="text-dark text-xsm">
                                    This Takes 15-20 Seconds. Please Wait.
                                </p>
                            </div>
                            :
                            <>
                                <button
                                    className="text-dark text-xsm px-4 py-1 my-4 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-3/12"
                                    onClick={() => {
                                        setShowBioFilters(!show_bio_filters)
                                    }}
                                    type="submit"
                                >
                                    Filters {" "}
                                    {show_bio_filters ?
                                        <i className="fas fa-chevron-up"></i>
                                        :
                                        <i className="fas fa-chevron-down"></i>
                                    }
                                </button>
                                <button
                                    className="text-dark text-xsm px-4 py-1 my-4 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-3/12"
                                    onClick={fetchMedicalPapers}
                                    type="submit"
                                >
                                    Query
                                    <i className="fas fa-search"></i>
                                </button>
                            </>
                        }
                    </div>
                    <div className="flex flex-wrap justify-center text-center items-center">
                    </div>
                    <div className="flex flex-wrap justify-center">
                        {
                            similar_medical_papers.map((paper, index) => (
                                <div className="w-full lg:w-4/12 px-4" key={index}
                                    onClick={() => {
                                        window.open(paper.link, "_blank")
                                    }}
                                >
                                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-lightGray-700">
                                        <div className="flex-auto p-5 lg:px-10">
                                            <h4 className="text-lg font-semibold text-white">
                                                {paper.title}
                                            </h4>
                                            <div className="flex flex-wrap">
                                                <div className="w-6/12 px-4">
                                                    <p className="text-xsm leading-relaxed mt-4 mb-4 text-emerald-500 text-left">
                                                        <span className="text-white">Authors: </span>
                                                        {paper.authors.split(",")[0]}, {paper.authors.split(",")[1]} ...
                                                    </p>
                                                </div>
                                                <div className="w-3/12 px-4">
                                                    <p className="text-xsm leading-relaxed mt-4 mb-4 text-emerald-500 text-left">
                                                        {paper.similarity.toFixed(2) * 100}%
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-xsm leading-relaxed mt-4 mb-4 text-white text-left">
                                                {paper.abstract.slice(0, 200) + "..."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default Instruct;