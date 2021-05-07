import React from "react";
import TransactionInfo from "./TransactionInfo";
import "./UserRewards.css";
import { isNullOrUndefined } from "util";
import RewardDetials from "./RewardDetails";
import UserTransactionDetails from "./UserTransactionDetails";

interface IUserRewardProps {
  userTransactions: UserTransactionDetails[];
}

class UserRewards extends React.Component<IUserRewardProps> {
  constructor(props: IUserRewardProps) {
    super(props);
  }

  private month: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  private getRewardPoints = (amount: number) => {
    let rewardpointsMorethan100 = 2;
    let totalevaluatedpoints = 0;
    if (amount > 100) {
      totalevaluatedpoints =
        50 + (amount - 100) * rewardpointsMorethan100;
    } else {
      totalevaluatedpoints = amount > 50 ? amount - 50 : 0;
    }
    return totalevaluatedpoints;
  };

  private renderUserRewards = (transactions: TransactionInfo[]) => {
    var usrMonthlyRewards: Map<string, number> = new Map();

    for (const iterator of transactions) {
      let data: string = new Date(iterator.transactionDate)
        .getMonth()
        .toString();

      if (!usrMonthlyRewards.has(data)) {
        usrMonthlyRewards.set(data, this.getRewardPoints(iterator.amount));
      } else {
        let value = usrMonthlyRewards.get(data);
        value = isNullOrUndefined(value) ? 0 : value;
        usrMonthlyRewards.set(
          data,
          value + this.getRewardPoints(iterator.amount)
        );
      }
    }

    let total = 0;
    let userRewardDetails: RewardDetials[] = [];

    for (let entry of Array.from(usrMonthlyRewards.entries())) {
      let key = entry[0];
      let value = entry[1];
      total = total + value;
      userRewardDetails.push({ monthName: key, totalpoints: value });
    }

    return (
      <React.Fragment>
        <div style={{ margin: "20px", fontWeight: "bold" }}>
          User Transactions list
        </div>
        <div>
          {transactions.map((tranItem) => {
            return (
              <div>{`Transaction with Id ${tranItem.transactionid} on date ${tranItem.transactionDate} for an amount of ${tranItem.amount} ${tranItem.currency}`}</div>
            );
          })}
        </div>
        <div style={{ margin: "20px" }}>
          <div style={{ fontWeight: "bold" }}>Rewards Earned Per Month</div>
          {userRewardDetails.map((x) => {
            return this.renderRewardByMonth(x.monthName, x.totalpoints);
          })}
        </div>
        <div style={{ fontWeight: "bold" }}>Total rewards</div>
        <div
          className="ur-details"
          style={{ margin: "20px", fontWeight: "bold" }}
        >{`Total Reward points : ${total}`}</div>
      </React.Fragment>
    );
  };

  private renderRewardByMonth = (
    monthName: string,
    points: Number | undefined
  ) => {
    let month = this.month[Number.parseInt(monthName)];
    return (
      <React.Fragment>
        <div>{`Reward points for the month of ${month} - ${points}`}</div>
      </React.Fragment>
    );
  };

  public render() {
    return (
      <React.Fragment>
        {this.props.userTransactions &&
          this.props.userTransactions.length > 0 &&
          this.props.userTransactions.map((x) => {
            return (
              <React.Fragment>
                <div
                  className="ur-details"
                  key={x.id.toString()}
                >{`userid : ${x.id}`}</div>
                <div>{this.renderUserRewards(x.transactions)}</div>
              </React.Fragment>
            );
          })}
      </React.Fragment>
    );
  }

  componentDidCatch() {
    return <div>{"Exception occured..."}</div>;
  }
}

export default UserRewards;
