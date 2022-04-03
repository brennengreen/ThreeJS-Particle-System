/**
 * @author Brennen Green brennengreen.dev
 * 
 * PARTICLES!
 * Implementation of all the systems required to make particles function
 */


// PARTICLE CLASS

/**
 * Particle Constructor Implementation
 * Contains the characteristics of simulation for
 * a single particle
 */
class Particle {
    constructor() {
        // Classical Mechanics Parameters
        this.position     = new THREE.Vector3();
        this.velocity     = new THREE.Vector3();
        this.acceleration = new THREE.Vector3();

        // Aesthetic Parameters
        this.color = new THREE.Color();
        this.opacity = 1.0;

        // Lifetime Parameters
        this.lifetime = 255.0;
        this.remaining = this.lifetime;
        this.dead = 0.0;
    }

    /**
     * Update this current Particle instance
     * @param {float} dt a proportionality constant for current upate 
     */
    Update(dt) {
        // This syntax is very confusing but resultant of functional
        // style programming. Essentially instead of using operators
        // we use functions which return instances of an object.
        // Because of the way ThreeJS built these functions, using
        // the .operation() on them manipulates the value itself
        // so we need to clone it before multiplying it.
        // DM Me if you have any questions.
        this.position.add(this.velocity.clone().multiplyScalar(dt)); 
        this.velocity.add(this.acceleration.clone().multiplyScalar(dt)); 

        this.remaining -= dt;
        if (remining <= 0.0) {
            dead = 1.0; // Particles has died
        }

        // If the particle is not yet dead update the aesthetics
        if (dead < 1.0)
            this.opacity = remaining / lifetime;
    }
}

// PARTICLE ENGINE

/**
 * EngineType Class (This class structure is supposed to mimic an enum class from C++)
 * Provides metadata for the type of engine being used currently
 * "Type" here means the macroscopic geometry of the engine
 */
class EngineType {
    static Cube = new EngineType('Cube', 1);
    static Sphere = new EngineType('Sphere', 2);

    constructor(name, id) {
        this.name = name;
        this.id = id
    }

    toString() {
        return `Color.${this.name}(${this.id})`
    }
}

/**
 * Tween Class
 * Provides mathematical foundation to use linear interpolation
 * based animations on our particles
 */
class Tween {
    constructor(time, value) {
        this.time  = time || [];
        this.value = value || [];
    }

    Lerp(dt) {
        var i = 0;
        var n = this.time.length;
        while (i < n && t > this.times[i]) {
            i++;
        }
        if (i == 0) return this.values[0];
        if (i == n) return this.values[n-1];
        var p = (t - this.times[i-1]) / (this.times[i] - tthis.times[i-1]);
        if (this.values[0] instanceof THREE.Vector3) {
            return this.values[i-1].clone().lerp(this.values[i], p);
        } else {
            return this.values[i-1] + p * (this.values[i] - this.values[i-1]);
        }
    }
}

/**
 * ParticleEngine Class
 * The bulwark of our project, helps create particles
 * and decides how to emit them properly.
 */
class ParticleEngine {
    constructor() {
        // Physics
        this.pos_style = EngineType.Cube
        this.pos_base = new THREE.Vector3();
        this.pos_spread = new THREE.Vector3();
        this.pos_radius = new THREE.Vector3();

        this.vel_style = EngineType.Cube
        this.vel_base = new THREE.Vector3();
        this.vel_spread = new THREE.Vector3();
        this.speed_base = 0;
        this.speed_spread = 0;

        this.acc_base = new THREE.Vector3();
        this.acc_spread = new THREE.Vector3();

        // Attributes
        this.size_base = 0.0;
        this.size_spread = 0.0;
        this.size_tween = new Tween();
        this.opacity_base = 1.0;
        this.opacity_spread = 0.0;
        this.opacity_tween = new Tween();
        this.blend = THREE.NormalBlending;

        // Buffer
        this.particle_buffer = [];
        this.pps = 100;
        this.particle_death = 1.0;

        this.emitter_age = 0.0;
        this.emitter_firing = true;
        this.emitter_death = 60.0;

        this.particle_count = this.pps * Math.min(this.particle_death, this.emitter_death);

        this.particle_geom = new THREE.BufferGeometry();  // specify points
        this.particle_geom.setAttribute('customVisible', []);
        this.particle_geom.setAttribute('customSize', []);
        this.particle_geom.setAttribute('customOpacity', []);
        this.particle_geom.setAttribute('customColor', []);
        this.particle_tex = null;
        this.particle_mat = new THREE.ShaderMaterial( 
            {
                uniforms: 
                {
                    texture1:   { type: "t", value: this.particle_tex },
                },
                vertexShader:   particleVertexShader,
                fragmentShader: particleFragmentShader,
                transparent: true,
                blending: THREE.NormalBlending, depthTest: true,
                alphaTest: 0.5,
                vertexColors: true,
            });
        
        this.particleMesh = new THREE.Mesh();

    }
}
