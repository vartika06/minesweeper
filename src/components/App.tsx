import Display from "./Display/Display";
import Status from "./Status/Status";
import Grid from "./Grid/Grid";

const App = (): JSX.Element => {
    return (
        <div className="minesweeper">
            <div className="header">
                <Display testId="flags-display" value={0} />
                <Status testId="face-status" />
                <Display testId="mines-display" value={10} />
            </div>
            <div className="content">
                <Grid />
            </div>
        </div>
    );
};

export default App;
