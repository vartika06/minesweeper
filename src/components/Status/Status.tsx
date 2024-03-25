import React from "react";

interface StatusProps {
    testId: string;
}

const Status = ({ testId }: StatusProps): JSX.Element => {
    return (
        <div className="status" data-testid={testId}>
            <span className="face" role="img" aria-label="state">
                😀
            </span>
        </div>
    );
};

export default Status;
