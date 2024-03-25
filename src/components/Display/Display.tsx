import React from "react";

import { formatData } from "../../utils/data";

interface DisplayProps {
    testId: string;
    value: number;
}

const Display = ({ value, testId }: DisplayProps): JSX.Element => {
    return (
        <div className="display" data-testid={testId}>
            {formatData(value)}
        </div>
    );
};

export default Display;
