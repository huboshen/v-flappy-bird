<template>
    <div id="flappy-bird-wrapper" class="">
        <div id="background" ref="background" :class="backgroundClass">
            <bird :bird-style="bird" ref="bird"> </bird>
            <pipe v-for="(pipe, i) in pipes" :key="i" :pipe-style="pipe"></pipe>
        </div>
        <ground :best-score-digits="bestScoreDigits"></ground>
        <game-panel
            :show-game-over-title="showGameOverTitle"
            :score="score"
            :has-break-record="hasBreakRecord"
        ></game-panel>
    </div>
</template>

<script>
const PLAYGROUND_DIMENTIONS = {
    width: 288,
    height: 400,
};
const PIPE_DIMENTIONS = {
    width: 52,
    height: 320,
};
const BIRD_DIMENTIONS = {
    width: 34,
    height: 24,
};

// Settings Related to the game difficulty
const SETTINGS = {
    pipeInterval: 150,
    pipeGapMin: 4 * BIRD_DIMENTIONS.height,
    pipeGapMax: 7 * BIRD_DIMENTIONS.height,
};
import Pipe from "@/components/Pipe";
import Bird from "@/components/Bird";
import GamePanel from "@/components/GamePanel";
import Ground from "@/components/Ground";
export default {
    name: "FlappyBird",
    components: {
        Pipe,
        Bird,
        GamePanel,
        Ground,
    },
    data() {
        return {
            backgroundClass: this.getNewBackgroundClass(),
            bird: { bottom: 200, left: 80, rotate: 0 },
            pipes: [],
            pipeMover: null,
            birdMover: null,
            birdMoveRID: null,
            pipeMoveRID: null,
            isGaming: false,
            score: 0,
            showGameOverTitle: false,
            bestScore: 0,
            hasBreakRecord: false,
        };
    },
    computed: {
        bestScoreDigits() {
            return Array.from(String(this.bestScore), Number);
        },
    },
    methods: {
        // Random generate a background
        // either a daylight background or a night one
        getNewBackgroundClass() {
            return Math.random() <= 0.5 ? "daylight" : "night";
        },
        // ref: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
        randomIntFromInterval(min, max) {
            // min and max included
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
        generatePipe() {
            const fixEdge = 30;
            const currentGap = this.randomIntFromInterval(
                SETTINGS.pipeGapMin,
                SETTINGS.pipeGapMax
            );
            const currentExtendOffset = this.randomIntFromInterval(
                0,
                -(-PIPE_DIMENTIONS.height + fixEdge * 4)
            );
            this.pipes.push({
                right: -PIPE_DIMENTIONS.width,
                pipeTopTop: -PIPE_DIMENTIONS.height + 38 + currentExtendOffset,
                pipeBottomTop: fixEdge + currentExtendOffset + currentGap,
                status: "inComing",
            });
        },
        movePipe() {
            const vm = this;
            const backgroundWidth = this.$refs.background.offsetWidth;

            function animate({ timing, draw }) {
                let start = performance.now();

                vm.pipeMoveRID = requestAnimationFrame(function animate(time) {
                    // timeElapsed goes from 0 to 1
                    let timeElapsed = (time - start) / 1000; // seconds

                    // calculate the current animation state
                    let progress = timing(timeElapsed);

                    draw(progress); // draw it

                    vm.pipeMoveRID = requestAnimationFrame(animate);

                    // check game over condition
                    vm.gameStatusHandler();
                });
            }
            function timing(timeElapsed) {
                return 1;
            }
            function draw(progress) {
                vm.pipes.forEach((pipe) => {
                    // remove pipe if is outside of the game left border
                    if (pipe.right >= backgroundWidth) {
                        vm.pipes.shift();
                    }

                    if (
                        vm.pipes[vm.pipes.length - 1].right >
                        SETTINGS.pipeInterval
                    ) {
                        vm.generatePipe();
                    }
                    pipe.right += progress;
                });
            }
            animate({ timing, draw });
        },
        moveBird() {
            document.addEventListener(
                "keydown",
                this.spaceEventListener("keycode"),
                false
            );
            document.addEventListener(
                "touchend",
                this.spaceEventListener(),
                false
            );
        },
        spaceEventListener(mode) {
            const vm = this;
            // https://javascript.info/js-animation#:~:text=Using%20setInterval,second%2C%20then%20it%20looks%20smooth.
            function animate({ timing, draw }) {
                let start = performance.now();

                vm.birdMoveRID = requestAnimationFrame(function animate(time) {
                    // timeElapsed goes from 0 to 1
                    let timeElapsed = (time - start) / 1000; // seconds

                    // calculate the current animation state
                    let progress = timing(timeElapsed);

                    // check bird is jumping or falling
                    if (progress >= 0) {
                        // jumping, bird facing up
                        vm.bird.rotate = -30;
                    } else if (progress > -7) {
                        // failling a little bit, bird facing forward
                        vm.bird.rotate = 0;
                    } else {
                        // failling sharply, bird facing down
                        vm.bird.rotate = 30;
                    }

                    draw(progress); // draw it

                    if (vm.bird.bottom >= 0) {
                        vm.birdMoveRID = requestAnimationFrame(animate);
                    } else {
                        // touch bottom, game over
                        vm.handleGameOver();
                    }
                });
            }
            function timing(timeElapsed) {
                // use different epression for lifting or failing movement.
                const exprLifting = -40 * Math.pow(timeElapsed - 0.12, 2) + 3;
                if (exprLifting > 0) {
                    return exprLifting;
                } else {
                    return -8 * Math.pow(timeElapsed - 0.12, 2) + 1.5;
                }
            }

            function draw(progress) {
                vm.bird.bottom += progress;
            }

            function spaceBehaviorHandler() {
                if (vm.isGaming) {
                    // clicking space for bird jumping
                    if (vm.birdMoveRID) cancelAnimationFrame(vm.birdMoveRID);
                    animate({ timing, draw });
                } else {
                    // start/restart the game
                    vm.resetGameData();
                    vm.isGaming = true;
                    vm.generatePipe();
                    vm.movePipe();
                    animate({ timing, draw });
                }
            }

            if (mode === "keycode") {
                return ({ keyCode }) => {
                    // space or enter
                    if (keyCode === 32 || keyCode === 13) {
                        spaceBehaviorHandler();
                    }

                    if (keyCode === 83) {
                        if (vm.pipeMoveRID)
                            cancelAnimationFrame(vm.pipeMoveRID);
                        if (vm.birdMoveRID)
                            cancelAnimationFrame(vm.birdMoveRID);
                    }
                };
            } else {
                return () => {
                    spaceBehaviorHandler();
                };
            }
        },
        gameStatusHandler() {
            const nearestPipe = this.pipes.find(
                (pipe) => pipe.status !== "passed"
            ); // find the latest in coming or passing pipe
            this.birdPipeStatus(nearestPipe); // update status for the
            switch (nearestPipe.status) {
                case "passing":
                    const gapTop =
                        PIPE_DIMENTIONS.height + nearestPipe.pipeTopTop;
                    const gapBottomTop = nearestPipe.pipeBottomTop;
                    if (
                        this.bird.bottom + BIRD_DIMENTIONS.height + gapTop >=
                            PLAYGROUND_DIMENTIONS.height ||
                        this.bird.bottom + gapBottomTop <=
                            PLAYGROUND_DIMENTIONS.height
                    ) {
                        this.handleGameOver();
                    }
                    break;
            }
        },
        birdPipeStatus(nearestPipe) {
            const oldStatus = nearestPipe.status;
            const pipeRightEdgeLeftosition =
                PLAYGROUND_DIMENTIONS.width - nearestPipe.right;
            const pipeLeftEdgeLeftosition =
                pipeRightEdgeLeftosition - PIPE_DIMENTIONS.width;
            const birdRightEdgeLeftPosition =
                this.bird.left + BIRD_DIMENTIONS.width;

            let status = "passing";
            if (pipeLeftEdgeLeftosition - birdRightEdgeLeftPosition >= 0) {
                status = "inComing";
            } else if (pipeRightEdgeLeftosition - this.bird.left <= 0) {
                status = "passed";
                if (oldStatus === "passing") this.score += 1; // passing => passed, gain one score
            }
            nearestPipe.status = status;
        },
        handleGameOver() {
            this.isGaming = false;
            if (this.pipeMoveRID) cancelAnimationFrame(this.pipeMoveRID);
            if (this.birdMoveRID) cancelAnimationFrame(this.birdMoveRID);
            this.handleBestScore();
            this.showGameOverTitle = true;
        },
        resetGameData() {
            this.bird = { bottom: 200, left: 80 };
            this.pipes = [];
            this.pipeMover = null;
            this.birdMover = null;
            this.birdMoveRID = null;
            this.pipeMoveRID = null;
            this.isGaming = false;
            this.score = 0;
            this.showGameOverTitle = false;
            this.hasBreakRecord = false;
            this.backgroundClass = this.getNewBackgroundClass();
        },
        getBestScore() {
            this.bestScore =
                localStorage.getItem("myVFlappyBirdBestScore") || 0;
        },
        handleBestScore() {
            if (this.score > this.bestScore) {
                this.bestScore = this.score;
                this.hasBreakRecord = true;
                localStorage.setItem("myVFlappyBirdBestScore", this.bestScore);
            }
        },
    },
    mounted() {
        this.getBestScore();
        this.moveBird();
    },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/images/flappy-bird/scss/flappy-bird.scss";
</style>
