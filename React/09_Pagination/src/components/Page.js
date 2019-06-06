import React from 'react';

function Page({ totalPages, pageIndex, handlePrev, handleNext, handleClickPage }) {
    if (pageIndex < 6) {
        let liArr = [];
        let length = totalPages <= 6 ? totalPages : 6;
        for (let i = 1; i <= length; i++) {
            liArr.push(i);
        }

        return (
            <ol>
                <li className={pageIndex !== 1 ? "prev" : "hide"} onClick={handlePrev}>{"上一页"}</li>
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
                <li className="next" onClick={handleNext}>{"下一页"}</li>
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
                <li className={pageIndex !== totalPages ? "next" : "hide"} onClick={handleNext}>{"下一页"}</li>
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
                <li className="next" onClick={handleNext}>{"下一页"}</li>
            </ol>
        )
    }
}

export default Page;