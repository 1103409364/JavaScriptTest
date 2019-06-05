import React from 'react';
import './Pagination.scss';
import Page from './components/Page';

class Pagination extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pageIndex: 10,
        }

        this.handlePrev = this.handlePrev.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleClickPage = this.handleClickPage.bind(this);
    }
    // 上一页
    handlePrev() {
        if (this.state.pageIndex > 1) {
            this.setState({
                pageIndex: this.state.pageIndex - 1
            })

            this.props.callback(this.state.pageIndex - 1);
        }
    }
    // 下一页
    handleNext() {
        if (this.state.pageIndex < this.props.totalPages) {
            this.setState({
                pageIndex: this.state.pageIndex + 1
            });

            this.props.callback(this.state.pageIndex + 1);
        }
    }
    // 点击页码
    handleClickPage(i) {
        this.setState({
            pageIndex: i
        });

        this.props.callback(i);
    }
    
    render() {
        return (
            <div className="pagination">
                <Page
                    {...this.props}
                    pageIndex={this.state.pageIndex}
                    handlePrev={this.handlePrev}
                    handleNext={this.handleNext}
                    handleClickPage={this.handleClickPage}
                />
            </div>
        );
    }

}

export default Pagination;
