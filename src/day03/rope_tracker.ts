class RopeTracker {
    private headCoordinates: [number, number];
    private tailCoordinates: [number, number];
    private tailLocationHistory: string[];
    private debug: boolean;

    constructor(debug: boolean = false) {
        this.headCoordinates = [0, 0];
        this.tailCoordinates = [0, 0];
        this.tailLocationHistory = [];
        this.debug = debug;
        this.recordTailHistory();
    }

    public simulateSeries(inputLine: string): void {
        const motions: string[] = inputLine.trim().split(' ');

        for (let i = 0; i < parseInt(motions[1], 10); i++) {
            this.updateHead(motions[0]);
            this.updateTail();
        }
    }

    private updateHead(direction: string): void {
        switch (direction) {
            case 'L':
                this.headCoordinates[0] -= 1;
                break;
            case 'R':
                this.headCoordinates[0] += 1;
                break;
            case 'U':
                this.headCoordinates[1] += 1;
                break;
            case 'D':
                this.headCoordinates[1] -= 1;
                break;
        }
    }

    private recordTailHistory(): void {
        const currentPoint: string = JSON.stringify(this.tailCoordinates);
        this.tailLocationHistory.push(currentPoint);
    }

    public getWholeTailHistory(): string[] {
        return [...this.tailLocationHistory];
    }

    private moveDiagonally(xDiff: number, yDiff: number): void {
        this.tailCoordinates[0] += xDiff > 0 ? 1 : -1;
        this.tailCoordinates[1] += yDiff > 0 ? 1 : -1;
    }

    private moveStraight(coordinateObj: number, cDiff: number): number {
        return coordinateObj + (cDiff > 0 ? 1 : -1);
    }

    private updateTail(): void {
        const xDiff: number = this.headCoordinates[0] - this.tailCoordinates[0];
        const yDiff: number = this.headCoordinates[1] - this.tailCoordinates[1];

        if (Math.abs(xDiff) < 2 && Math.abs(yDiff) < 2) {
            return;
        }

        if (Math.abs(xDiff) > 1 && Math.abs(yDiff) > 0) {
            this.moveDiagonally(xDiff, yDiff);
        } else if (Math.abs(xDiff) > 0 && Math.abs(yDiff) > 1) {
            this.moveDiagonally(xDiff, yDiff);
        } else if (xDiff === 0 && Math.abs(yDiff) > 0) {
            this.tailCoordinates[1] = this.moveStraight(this.tailCoordinates[1], yDiff);
        } else if (Math.abs(xDiff) > 0 && yDiff === 0) {
            this.tailCoordinates[0] = this.moveStraight(this.tailCoordinates[0], xDiff);
        }

        this.recordTailHistory();
    }
}
