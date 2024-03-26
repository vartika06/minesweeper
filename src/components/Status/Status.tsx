import React from "react";

import { STATUS_FACE } from "../../constants";

interface StatusProps {
    status: keyof typeof STATUS_FACE;
    handleFaceClick: () => void;
    testId: string;
}

const Status = ({
    status,
    handleFaceClick,
    testId
}: StatusProps): JSX.Element => {
    return (
        <div className="status" data-testid={testId} onClick={handleFaceClick}>
            <span className="face" role="img" aria-label="state">
                {STATUS_FACE[status]}
            </span>
        </div>
    );
};

export default Status;
