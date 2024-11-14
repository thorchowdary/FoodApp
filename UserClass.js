import React from "react";
class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      count1: 0,
    };
  }

  render() {
    const { name } = this.props;
    const { count } = this.state;
    return (
      <div className="user-card">
        <h1>count :{count}</h1>
        <h2>name:{name}</h2>
        <button
          onClick={() => {
            this.setState({
              count: this.state.count + 1,
            });
          }}
        >
          increase count
        </button>
      </div>
    );
  }
}

export default UserClass;
