import { Uniform, Vector2, Vector3 } from "three";

/**

    Here on top you can find the uniforms for each distortion. 

    // ShaderShaping funcitns
    https://thebookofshaders.com/05/
     Steps 
     1. Write getDistortion in GLSL
     2. Write custom uniforms for tweak parameters. Put them outside the object.
     3. Re-create the GLSl funcion in javascript to get camera paning

     Notes: 
     LookAtAmp AND lookAtOffset are hand tuned to get a good camera panning.
 */

    const deepUniforms = {
      // x, y
      uFreq: new Uniform(new Vector2(4, 8)),
      uAmp: new Uniform(new Vector2(10, 20)),
      uPowY: new Uniform(new Vector2(20, 2))
    };

    export const deepDistortion = {
      uniforms: deepUniforms,
      getDistortion: `
            uniform vec4 uFreq;
            uniform vec4 uAmp;
            uniform vec2 uPowY;
            float nsin(float val){
            return sin(val) * 0.5+0.5;
            }
        
            #define PI 3.14159265358979
            float getDistortionX(float progress){
                return 
                        (
                            sin(progress * PI * uFreq.x + uTime) * uAmp.x
                        
                        );
            }
            float getDistortionY(float progress){
                return 
                        (
                            pow(abs(progress * uPowY.x),uPowY.y) + sin(progress * PI * uFreq.y + uTime) * uAmp.y
                        );
            }
            vec3 getDistortion(float progress){
                return vec3(
                    getDistortionX(progress)-getDistortionX(0.02) ,
                    getDistortionY(progress)- getDistortionY(0.02),
                    0.
                );
            }
        `,
      getJS: (progress, time) => {
        const uFreq = deepUniforms.uFreq.value;
        const uAmp = deepUniforms.uAmp.value;
        const uPowY = deepUniforms.uPowY.value;

        const getX = p => Math.sin(p * Math.PI * uFreq.x + time) * uAmp.x;
        const getY = p =>
          Math.pow(p * uPowY.x, uPowY.y) +
          Math.sin(p * Math.PI * uFreq.y + time) * uAmp.y;
    
        let distortion = new Vector3(
          getX(progress) - getX(progress + 0.01),
          getY(progress) - getY(progress + 0.01),
          0
        );
        let lookAtAmp = new Vector3(-2, -4, 0);
        let lookAtOffset = new Vector3(0, 0, -10);
        return distortion.multiply(lookAtAmp).add(lookAtOffset);
      }
    };