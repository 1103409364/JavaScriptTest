import React from 'react';

function Page({ totalPages, pageIndex, handlePrev, handleNext, handleClickPage }) {
    if (pageIndex < 6) {
        let liArr = [1, 2, 3, 4, 5, 6];
        return (
            <ol>
                <li className="prev" onClick={handlePrev}>{"prev"}</li>
                {
                    liArr.map((item) => {
                        return (
                            <li
                                key={item}
                                className={item === pageIndex ? "cur" : ""}
                                onClick={() => { handleClickPage(item) }}
                            >{item}
                            </li>
                        )
                    })
                }
                <li className="next" onClick={handleNext}>{"next"}</li>
            </ol>
        )
    } else if (pageIndex > totalPages - 5) {
        let liArr = [totalPages - 5, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];

        return (
            <ol>
                <li className="prev" onClick={handlePrev}>{"prev"}</li>
                {
                    liArr.map((item) => {
                        return <li
                            key={item}
                            className={item === pageIndex ? "cur" : ""}
                            onClick={() => { handleClickPage(item) }}
                        >{item}
                        </li>
                    })
                }
                <li className="next" onClick={handleNext}>{"next"}</li>
            </ol>
        )
    } else {
        let liArr = [1, '...', pageIndex - 3, pageIndex - 2, pageIndex - 1, pageIndex, pageIndex + 1, pageIndex + 2, pageIndex + 3, '...', totalPages];
        return (
            <ol>
                <li className="prev" onClick={handlePrev}>{"prev"}</li>
                {
                    liArr.map((item, index) => {
                        return (
                            <li
                                key={index}
                                className={item === "..." ? "eclipse" : item === pageIndex ? "cur" : ""}
                                onClick={item !== "..." ? () => { handleClickPage(item) } : null}
                            >{item}
                            </li>)
                    })
                }
                <li className="next" onClick={handleNext}>{"next"}</li>
            </ol>
        )
    }
}

export default Page;