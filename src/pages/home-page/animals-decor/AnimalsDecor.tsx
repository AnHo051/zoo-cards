import { useRef } from "react";
import { ReactComponent as Dinasour } from "../../../images/banner/dinosaur.svg";
import { ReactComponent as DinasourLine } from "../../../images/banner/dinosaur-line.svg";
import { ReactComponent as Zebra } from "../../../images/banner/zebra.svg";
import { ReactComponent as ZebraLine } from "../../../images/banner/zebra-line.svg";
import { ReactComponent as Hippo } from "../../../images/banner/hippo.svg";
import { ReactComponent as Cow } from "../../../images/banner/cow.svg";
import { ReactComponent as Crab } from "../../../images/banner/crab.svg";
import { ReactComponent as CrabLine } from "../../../images/banner/crab-line.svg";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(MotionPathPlugin);

export default function AnimalsDecor() {
  const refRoot = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const dinosaurTl = gsap.timeline({
      ease: "circ.out",
      duration: 1,
    });

    dinosaurTl
      .fromTo(
        "#dinosaur-right-foot",
        {
          rotate: 20,
          transformOrigin: "top",
        },
        {
          rotate: -20,
          yoyo: true,
          repeat: -1,
        },
        ">"
      )
      .fromTo(
        "#dinosaur-left-hand",
        {
          rotate: -10,
          transformOrigin: "left",
        },
        {
          rotate: 10,
          yoyo: true,
          repeat: -1,
        },
        "<"
      )
      .fromTo(
        "#dinosaur-right-hand",
        {
          rotate: -20,
          transformOrigin: "right",
        },
        {
          rotate: -10,
          yoyo: true,
          repeat: -1,
        }
      )
      .fromTo(
        "#dinosaur-left-foot",
        {
          rotate: -20,
          transformOrigin: "top",
        },
        {
          rotate: 20,
          yoyo: true,
          repeat: -1,
        },
        "<"
      )
      .fromTo(
        "#dinosaur-eye",
        {
          scale: 0.8,
        },
        {
          scale: 1,
          duration: 1,
          yoyo: true,
          repeat: -1,
        }
      )
      .to(
        "#dinosaur",
        {
          motionPath: {
            path: "#dinosaur-path",
            align: "#dinosaur-path",
            alignOrigin: [0.5, 1],
          },
          duration: 6,
          onComplete: () => {
            gsap.to(["#dinosaur-right-foot", "#dinosaur-left-foot"], {
              rotate: 0,
              onComplete: () => {
                gsap.killTweensOf([
                  "#dinosaur-left-foot",
                  "#dinosaur-right-foot",
                ]);
              },
            });
          },
        },
        ">"
      );

    const zebraTl = gsap.timeline({
      ease: "power1.inOut",
      duration: 1,
    });
    zebraTl
      .fromTo(
        "#zebra-ear-left",
        {
          rotate: 5,
          transformOrigin: "bottom",
        },
        {
          rotate: -5,
          yoyo: true,
          repeat: -1,
          duration: 1,
        }
      )
      .fromTo(
        ["#zebra-ear-right", "#zebra-tail"],
        {
          rotate: -3,
          transformOrigin: "bottom",
        },
        {
          rotate: 3,
          yoyo: true,
          repeat: -1,
          duration: 1,
        },
        "<"
      )
      .fromTo(
        "#zebra-left-foot",
        {
          rotate: -10,
          transformOrigin: "top",
        },
        {
          rotate: 10,
          yoyo: true,
          repeat: -1,
          duration: 1,
        },
        "<"
      )
      .fromTo(
        "#zebra-right-foot",
        {
          rotate: 10,
          transformOrigin: "top",
        },
        {
          rotate: -10,
          yoyo: true,
          repeat: -1,
          duration: 1,
        },
        "<"
      )
      .fromTo(
        "#zebra-right-hand",
        {
          rotate: -20,
          transformOrigin: "right",
        },
        {
          rotate: -10,
          yoyo: true,
          repeat: -1,
        }
      )
      .fromTo(
        "#zebra-left-hand",
        {
          rotate: -5,
          transformOrigin: "left",
        },
        {
          rotate: 5,
          yoyo: true,
          repeat: -1,
        }
      )
      .to(
        "#zebra",
        {
          motionPath: {
            path: "#zebra-path",
            align: "#zebra-path",
            alignOrigin: [0.5, 1],
            autoRotate: true,
            end: 0.9,
          },
          duration: 4,
          onComplete: () => {
            gsap.to(["#zebra-right-foot", "#zebra-left-foot"], {
              rotate: 0,
              onComplete: () => {
                gsap.killTweensOf(["#zebra-left-foot", "#zebra-right-foot"]);
              },
            });
          },
        },
        ">"
      );

    const hippoTl = gsap.timeline({
      ease: "power2.inOut",
      duration: 1,
    });

    hippoTl
      .fromTo(
        "#hippo-head",
        {
          rotate: -3,
          transformOrigin: "bottom",
        },
        {
          rotate: 3,
          yoyo: true,
          repeat: -1,
          duration: 1,
        }
      )
      .fromTo(
        "#hippo-eye",
        {
          scale: 1,
          transformOrigin: "center",
        },
        {
          scale: 0.9,
          duration: 0.3,
          yoyo: true,
          repeat: -1,
        },
        "<"
      )
      .to("#hippo-body", {
        y: 5,
        yoyo: true,
        repeat: -1,
      })
      .fromTo(
        ["#hippo-foot-1", "#hippo-foot-3"],
        {
          rotate: 10,
          transformOrigin: "top",
        },
        {
          rotate: -10,
          yoyo: true,
          repeat: -1,
          duration: 1,
        },
        "<"
      )
      .fromTo(
        "#hippo-foot-2",
        {
          rotate: -10,
          transformOrigin: "top",
        },
        {
          rotate: 10,
          yoyo: true,
          repeat: -1,
          duration: 1,
        },
        "<"
      )
      .to(
        "#hippo",
        {
          motionPath: {
            path: "#dinosaur-path",
            align: "#dinosaur-path",
            alignOrigin: [0.5, 0.5],
            end: 0.7,
          },
          delay: 2,
          duration: 4,
          onComplete: () => {
            gsap.to(["#hippo-foot-1", "#hippo-foot-2", "#hippo-foot-3"], {
              rotate: 0,
              onComplete: () => {
                gsap.killTweensOf([
                  "#hippo-foot-1",
                  "#hippo-foot-2",
                  "#hippo-foot-3",
                  "#hippo-body",
                ]);
              },
            });
          },
        },
        ">"
      );

    const cowTl = gsap.timeline({
      ease: "circ.out",
      duration: 1,
    });

    cowTl
      .fromTo(
        ["#cow-hair", "#cow-tail"],
        {
          skewX: "6deg",
          transformOrigin: "bottom",
        },
        {
          skewX: "-6deg",
          yoyo: true,
          repeat: -1,
          duration: 1,
        }
      )
      .fromTo(
        "#cow-ear-left",
        {
          rotate: -5,
          transformOrigin: "left",
        },
        {
          rotate: 5,
          yoyo: true,
          repeat: -1,
          duration: 1,
        },
        "<"
      )
      .fromTo(
        "#cow-ear-right",
        {
          rotate: 5,
          transformOrigin: "right",
        },
        {
          rotate: -5,
          yoyo: true,
          repeat: -1,
          duration: 1,
        },
        "<"
      )
      .fromTo(
        ["#cow-foot-1", "#cow-foot-3"],
        {
          rotate: 10,
          transformOrigin: "top",
        },
        {
          rotate: -10,
          yoyo: true,
          repeat: -1,
          duration: 1,
        },
        "<"
      )
      .fromTo(
        ["#cow-foot-2", "#cow-foot-4"],
        {
          rotate: -10,
          transformOrigin: "top",
        },
        {
          rotate: 10,
          yoyo: true,
          repeat: -1,
          duration: 1,
        },
        "<"
      )
      .to(
        "#cow",
        {
          motionPath: {
            path: "#zebra-path",
            align: "#zebra-path",
            alignOrigin: [0.5, 1],
            end: 0.5,
            autoRotate: true,
          },
          duration: 5,
          onComplete: () => {
            gsap.to(
              ["#cow-foot-1", "#cow-foot-2", "#cow-foot-3", "#cow-foot-4"],
              {
                rotate: 0,
                onComplete: () => {
                  gsap.killTweensOf([
                    "#cow-foot-1",
                    "#cow-foot-2",
                    "#cow-foot-3",
                    "#cow-foot-4",
                  ]);
                },
              }
            );
          },
        },
        ">"
      );

    const crabTl = gsap.timeline({
      ease: "power2.inOut",
      duration: 1,
    });

    crabTl
      .fromTo(
        "#crab-leg-left",
        {
          rotate: -5,
          transformOrigin: "left",
        },
        {
          rotate: 5,
          yoyo: true,
          repeat: -1,
          duration: 0.3,
          stagger: 0.1,
        }
      )
      .fromTo(
        "#crab-leg-right",
        {
          rotate: 5,
          transformOrigin: "right",
        },
        {
          rotate: -5,
          yoyo: true,
          repeat: -1,
          duration: 0.3,
          stagger: 0.1,
        },
        "<-0.3"
      )
      .fromTo(
        "#crab-body",
        {
          y: -5,
          transformOrigin: "center",
        },
        {
          y: 5,
          yoyo: true,
          repeat: -1,
          duration: 1,
        },
        ">"
      )
      .fromTo(
        "#crab-claw-left",
        {
          rotate: -5,
          transformOrigin: "bottom",
        },
        {
          rotate: 5,
          yoyo: true,
          repeat: -1,
          duration: 1,
        },
        "<"
      )
      .fromTo(
        "#crab-claw-right",
        {
          rotate: 5,
          transformOrigin: "bottom",
        },
        {
          rotate: -5,
          yoyo: true,
          repeat: -1,
          duration: 1,
        },
        "<"
      )
      .to(
        "#crab",
        {
          motionPath: {
            path: "#crab-path",
            align: "#crab-path",
            alignOrigin: [0.5, 0.5],
          },
          duration: 5,
          onComplete: () => {
            gsap.to(["#crab-leg-left", "#crab-leg-right"], {
              rotate: 0,
              onComplete: () => {
                gsap.killTweensOf(["#crab-leg-left", "#crab-leg-right"]);
              },
            });
          },
        },
        ">"
      );
  }, [{ container: refRoot.current }]);

  return (
    <div
      className="fixed bottom-0 w-full z-10 z-3 pointer-events-none select-none"
      ref={refRoot}
    >
      <DinasourLine className="opacity-0 absolute -bottom-[5vh] w-1/2 -right-[16%]" />
      <Dinasour className="absolute bottom-[2vh] w-1/6 -right-[20%] overflow-visible" />

      <Cow className="w-[14%] absolute bottom-0 overflow-visible -left-[30%]" />

      <ZebraLine className="opacity-0 w-2/5 absolute -bottom-[5vh] overflow-visible left-0" />
      <Zebra className="w-[12%] absolute bottom-0 -left-[30%] overflow-visible " />

      <Hippo className="w-1/6 absolute -right-[25%] overflow-visible" />

      <Crab className="w-[12%] absolute bottom-[5vh] -right-[40%] overflow-visible" />

      <CrabLine className="opacity-0 w-1/3 absolute left-[52%] bottom-[5vh] overflow-visible" />
    </div>
  );
}
