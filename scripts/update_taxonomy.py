import json

TAXONOMY = [
  {
    "section_id": "section_1",
    "section_number": 1,
    "section_name": "Engineering Mathematics",
    "full_title": "Section 1: Engineering Mathematics",
    "code": "EM",
    "icon": "Calculator",
    "weightage": "13-15 Marks",
    "topics": [
      # Broad official topics for legacy & PYQ parity
      {
        "topic_id": "linear_algebra",
        "topic_name": "Linear Algebra",
        "subtopics": [
          "Matrices and determinants",
          "Linear and orthogonal transformations",
          "Cayley–Hamilton theorem",
          "Eigen values and Eigen vectors",
          "Solutions of linear equations"
        ]
      },
      {
        "topic_id": "calculus",
        "topic_name": "Calculus",
        "subtopics": [
          "Limit, continuity and differentiability",
          "Partial derivatives",
          "Homogeneous function – Euler's theorem on homogeneous functions",
          "Total differentiation",
          "Maxima and minima of function with several independent variables",
          "Sequences and series – infinite series, tests for convergence",
          "Fourier, Taylor and MacLaurin series"
        ]
      },
      {
        "topic_id": "vector_calculus",
        "topic_name": "Vector Calculus",
        "subtopics": [
          "Vector differentiation",
          "Scalar and vector point functions",
          "Vector differential operators – del, gradient",
          "Divergence and curl",
          "Physical interpretations – line, surface and volume integrals",
          "Stokes, Gauss and Green's theorems"
        ]
      },
      {
        "topic_id": "differential_equations",
        "topic_name": "Differential Equations",
        "subtopics": [
          "Linear and non-linear first order Ordinary Differential Equations (ODE)",
          "Homogeneous differential equations",
          "Higher order linear ODEs with constant coefficients",
          "Laplace transforms and their inverse",
          "Partial Differential Equations – Laplace, heat and wave equations"
        ]
      },
      {
        "topic_id": "probability_and_statistics",
        "topic_name": "Probability and Statistics",
        "subtopics": [
          "Mean, median, mode and standard deviation",
          "Random variables",
          "Poisson, normal and binomial distributions",
          "Correlation and regression analysis"
        ]
      },
      {
        "topic_id": "numerical_methods",
        "topic_name": "Numerical Methods",
        "subtopics": [
          "Solutions of linear and non-linear algebraic equations",
          "Numerical integration – trapezoidal and Simpson's rule",
          "Numerical solutions of ODEs"
        ]
      },
      # Granular Question Bank Topics
      {
        "topic_id": "em_matrices_determinants",
        "topic_name": "Linear Algebra: Matrices & Determinants",
        "subtopics": [
          "Rank of a matrix",
          "Determinant properties",
          "Inverse of matrix",
          "Symmetric & skew-symmetric matrices",
          "Orthogonal matrices"
        ]
      },
      {
        "topic_id": "em_eigenvalues_cayley",
        "topic_name": "Linear Algebra: Eigenvalues & Cayley-Hamilton",
        "subtopics": [
          "Characteristic equations",
          "Eigenvalues and eigenvectors",
          "Cayley–Hamilton theorem",
          "Diagonalization of matrices",
          "Powers of matrices"
        ]
      },
      {
        "topic_id": "em_linear_systems",
        "topic_name": "Linear Algebra: Systems of Linear Equations",
        "subtopics": [
          "Homogeneous systems",
          "Non-homogeneous systems",
          "Gaussian elimination",
          "Consistency conditions",
          "Vector spaces and basis"
        ]
      },
      {
        "topic_id": "em_limits_continuity",
        "topic_name": "Calculus: Limits, Continuity & Differentiability",
        "subtopics": [
          "L'Hospital's rule",
          "Rolle's and Mean value theorems",
          "Continuity of multivariable functions",
          "Indeterminate forms"
        ]
      },
      {
        "topic_id": "em_partial_derivatives",
        "topic_name": "Calculus: Partial Derivatives & Maxima-Minima",
        "subtopics": [
          "Partial differentiation",
          "Euler's theorem on homogeneous functions",
          "Total derivatives",
          "Jacobian transformations",
          "Constrained extrema and Lagrange multipliers"
        ]
      },
      {
        "topic_id": "em_series_convergence",
        "topic_name": "Calculus: Sequences, Infinite Series & Convergence",
        "subtopics": [
          "Ratio test",
          "Root test",
          "Comparison test",
          "Alternating series and Leibniz test",
          "Radius of convergence"
        ]
      },
      {
        "topic_id": "em_vector_differential",
        "topic_name": "Vector Calculus: Gradient, Divergence & Curl",
        "subtopics": [
          "Directional derivatives",
          "Scalar and vector fields",
          "Solenoidal and irrotational vectors",
          "Vector differential identities"
        ]
      },
      {
        "topic_id": "em_vector_integrals",
        "topic_name": "Vector Calculus: Line, Surface & Volume Integrals",
        "subtopics": [
          "Line integrals of vector fields",
          "Work done by force fields",
          "Surface integrals and flux",
          "Volume integrals",
          "Green's, Stokes' and Gauss divergence theorems"
        ]
      },
      {
        "topic_id": "em_first_order_odes",
        "topic_name": "Differential Equations: First Order ODEs",
        "subtopics": [
          "Variable separable ODEs",
          "Exact differential equations",
          "Integrating factors",
          "Linear first-order ODEs",
          "Bernoulli equations"
        ]
      },
      {
        "topic_id": "em_higher_order_odes",
        "topic_name": "Differential Equations: Higher Order Linear ODEs",
        "subtopics": [
          "Constant coefficients",
          "Complementary function and particular integral",
          "Method of variation of parameters",
          "Cauchy-Euler equations"
        ]
      },
      {
        "topic_id": "em_laplace_transforms",
        "topic_name": "Differential Equations: Laplace Transforms",
        "subtopics": [
          "Laplace transforms of elementary functions",
          "First and second shifting theorems",
          "Inverse Laplace transforms",
          "Convolution theorem",
          "ODE solutions via Laplace"
        ]
      },
      {
        "topic_id": "em_prob_distributions",
        "topic_name": "Probability & Statistics: Probability Distributions",
        "subtopics": [
          "Conditional probability and Bayes theorem",
          "Binomial distribution",
          "Poisson distribution",
          "Normal and standard normal distributions"
        ]
      },
      {
        "topic_id": "em_correlation_regression",
        "topic_name": "Probability & Statistics: Correlation & Regression Analysis",
        "subtopics": [
          "Mean, variance and standard deviation",
          "Covariance and Pearson correlation",
          "Linear regression equations"
        ]
      },
      {
        "topic_id": "em_roots_numerical",
        "topic_name": "Numerical Methods: Roots of Equations & Interpolation",
        "subtopics": [
          "Bisection method",
          "Newton-Raphson method",
          "Regula-Falsi method",
          "Order of convergence",
          "Lagrange interpolation"
        ]
      },
      {
        "topic_id": "em_quadrature_odes",
        "topic_name": "Numerical Methods: Numerical Integration & ODEs",
        "subtopics": [
          "Trapezoidal rule",
          "Simpson's 1/3 and 3/8 rules",
          "Euler's method",
          "Modified Euler's method",
          "Fourth-order Runge-Kutta method"
        ]
      }
    ]
  },
  {
    "section_id": "section_2",
    "section_number": 2,
    "section_name": "Farm Machinery",
    "full_title": "Section 2: Farm Machinery",
    "code": "FM",
    "icon": "Wrench",
    "weightage": "12-15 Marks",
    "topics": [
      # Broad official topics for legacy & PYQ parity
      {
        "topic_id": "machine_design",
        "topic_name": "Machine Design",
        "subtopics": [
          "Design and selection of machine elements – gears, pulleys, chains and sprockets and belts",
          "Overload safety devices used in farm machinery",
          "Measurement of force, stress, torque, speed, displacement and acceleration on machine elements – shafts, couplings, keys, bearings and knuckle joints"
        ]
      },
      {
        "topic_id": "farm_machinery",
        "topic_name": "Farm Machinery",
        "subtopics": [
          "Soil tillage",
          "Forces acting on a tillage tool",
          "Hitch systems and hitching of tillage implements",
          "Functional requirements, principles of working, construction and operation of manual, animal, tractor and renewable energy operated equipment for tillage, sowing, planting, fertilizer application, inter-cultivation, spraying, mowing, chaff cutting, harvesting and threshing",
          "Calculation of performance parameters – field capacity, efficiency, performance index, application rate and losses",
          "Cost analysis of implements and tractors",
          "Equipment for precision agriculture"
        ]
      },
      # Granular Question Bank Topics
      {
        "topic_id": "fm_gears_belts_chains",
        "topic_name": "Machine Design: Gears, Belts & Chain Drives",
        "subtopics": [
          "Spur and helical gear design",
          "Gear ratio and speed calculation",
          "V-belt drives and belt tensions",
          "Chain drives and sprocket kinematics"
        ]
      },
      {
        "topic_id": "fm_shafts_keys_bearings",
        "topic_name": "Machine Design: Shafts, Couplings, Keys & Bearings",
        "subtopics": [
          "Torsional and bending stress in shafts",
          "Rigid and flexible couplings",
          "Sunk keys and shear stress",
          "Antifriction bearings and bearing life"
        ]
      },
      {
        "topic_id": "fm_safety_clutches",
        "topic_name": "Machine Design: Overload Safety Devices & Clutches",
        "subtopics": [
          "Shear pins and slip clutches",
          "Jump clutches and friction safety devices",
          "Jaw clutches",
          "Power transmission safety"
        ]
      },
      {
        "topic_id": "fm_mb_ploughs",
        "topic_name": "Primary Tillage: Mouldboard Ploughs & Forces",
        "subtopics": [
          "Bottom components and share geometry",
          "Specific draft calculation",
          "Vertical and horizontal suction",
          "Furrow slice inversion and soil pulverization"
        ]
      },
      {
        "topic_id": "fm_disc_ploughs",
        "topic_name": "Primary Tillage: Disc Ploughs & Disc Geometry",
        "subtopics": [
          "Disc angle and tilt angle",
          "Width of cut for disc plough",
          "Scrapers and penetration mechanics",
          "Comparison with mouldboard ploughs"
        ]
      },
      {
        "topic_id": "fm_secondary_tillage",
        "topic_name": "Secondary Tillage: Disc Harrows & Cultivators",
        "subtopics": [
          "Offset and tandem disc harrows",
          "Gang angle adjustment",
          "Discing width and draft",
          "Cultivator tines and duckfoot sweeps"
        ]
      },
      {
        "topic_id": "fm_rotary_tillage",
        "topic_name": "Rotary Tillage: Rotavators & Blade Kinematics",
        "subtopics": [
          "Rotor speed and peripheral velocity",
          "Velocity ratio and tilling pitch",
          "Specific work and power requirement",
          "L-shaped and C-shaped blades"
        ]
      },
      {
        "topic_id": "fm_soil_dynamics_forces",
        "topic_name": "Soil Dynamics: Specific Draft, Cutting Forces & Hitching",
        "subtopics": [
          "Center of resistance",
          "Line of pull and draft forces",
          "Free-link and restrained-link hitching",
          "Soil shear failure and cutting resistance"
        ]
      },
      {
        "topic_id": "fm_sowing_planting",
        "topic_name": "Sowing Equipment: Seed Drills & Planters",
        "subtopics": [
          "Seed hopper and furrow openers",
          "Drive wheel and transmission",
          "Precision planters for maize and cotton",
          "Seed spacing and depth control"
        ]
      },
      {
        "topic_id": "fm_metering_calibration",
        "topic_name": "Metering Mechanisms & Calibration of Seed Drills",
        "subtopics": [
          "Fluted roller metering",
          "Internal double-run mechanisms",
          "Cell-type and cup-feed metering",
          "Calibration calculation and seed rate adjustment"
        ]
      },
      {
        "topic_id": "fm_plant_protection",
        "topic_name": "Plant Protection: Hydraulic & Pneumatic Sprayers",
        "subtopics": [
          "Knapsack and power sprayers",
          "Pump discharge and pressure",
          "Boom sprayers and nozzle spacing",
          "Spray drift control"
        ]
      },
      {
        "topic_id": "fm_spray_nozzles",
        "topic_name": "Spray Nozzles, Droplets & Application Rates",
        "subtopics": [
          "Flat fan, hollow cone and solid cone nozzles",
          "Volume Median Diameter (VMD) and Number Median Diameter (NMD)",
          "Spray application rate calculation"
        ]
      },
      {
        "topic_id": "fm_reapers_mowers",
        "topic_name": "Harvesting Equipment: Reapers, Mowers & Windrowers",
        "subtopics": [
          "Cutter bar kinematics and knife speed",
          "Register and alignment of cutter bar",
          "Vertical conveyor reapers",
          "Mower cutting ratio"
        ]
      },
      {
        "topic_id": "fm_combine_threshing",
        "topic_name": "Combine Harvesters: Threshing & Separation Mechanisms",
        "subtopics": [
          "Rasp bar, spike tooth and axial flow cylinders",
          "Concave clearance and wrap angle",
          "Straw walker separation efficiency"
        ]
      },
      {
        "topic_id": "fm_combine_losses",
        "topic_name": "Combine Harvesters: Grain Cleaning & Losses",
        "subtopics": [
          "Cleaning shoe, chaffer and sieve aerodynamics",
          "Header losses, cylinder losses and walker losses",
          "Total grain loss calculation"
        ]
      },
      {
        "topic_id": "fm_field_capacity",
        "topic_name": "Machinery Field Capacity, Efficiency & Economics",
        "subtopics": [
          "Theoretical and effective field capacity",
          "Field efficiency and turning losses",
          "Performance index",
          "Machine throughput capacity"
        ]
      },
      {
        "topic_id": "fm_cost_analysis",
        "topic_name": "Farm Machinery Cost Analysis & Economics",
        "subtopics": [
          "Depreciation methods (straight line, declining balance)",
          "Fixed costs (interest, housing, taxes)",
          "Variable costs (fuel, oil, repairs)",
          "Custom hiring rates"
        ]
      },
      {
        "topic_id": "fm_precision_ag",
        "topic_name": "Precision Agriculture & Sensor Technology",
        "subtopics": [
          "Variable rate application (VRA)",
          "Yield monitors and grain moisture sensors",
          "GPS guidance and auto-steer",
          "Drone spraying and remote sensing"
        ]
      }
    ]
  },
  {
    "section_id": "section_3",
    "section_number": 3,
    "section_name": "Farm Power",
    "full_title": "Section 3: Farm Power",
    "code": "FP",
    "icon": "Tractor",
    "weightage": "12-15 Marks",
    "topics": [
      # Broad official topics for legacy & PYQ parity
      {
        "topic_id": "sources_of_power",
        "topic_name": "Sources of Power",
        "subtopics": [
          "Sources of power on the farm – human, animal, mechanical, electrical, wind, solar and biomass",
          "Bio-fuels and their use in farm mechanization"
        ]
      },
      {
        "topic_id": "farm_power",
        "topic_name": "Farm Power",
        "subtopics": [
          "Thermodynamic principles of I.C. engines",
          "I.C. engine cycles",
          "Engine components",
          "Fuels and combustion",
          "Lubricants and their properties",
          "I.C. engine systems – fuel, cooling, lubrication, ignition, electrical, intake and exhaust",
          "Selection, operation, maintenance and repair of I.C. engines",
          "Power efficiencies and measurement, engine performance curves",
          "Calculation of power, torque, fuel consumption, heat load and power losses"
        ]
      },
      {
        "topic_id": "tractors_and_power_tillers",
        "topic_name": "Tractors and Power Tillers",
        "subtopics": [
          "Type, selection, maintenance and repair of tractors and power tillers",
          "Tractor clutches and brakes",
          "Power transmission systems – gear trains, differential, final drives and power take-off",
          "Mechanics of tractor chassis",
          "Traction theory",
          "Three point hitches – free link and restrained link operations",
          "Steering and hydraulic control systems used in tractors",
          "Tractor tests and performance",
          "Human engineering and safety considerations in design of tractor and agricultural implements"
        ]
      },
      # Granular Question Bank Topics
      {
        "topic_id": "fp_sources_renewable",
        "topic_name": "Sources of Farm Power & Renewable Energy",
        "subtopics": [
          "Human and draft animal power capabilities",
          "Solar PV and solar thermal systems on farms",
          "Wind turbines for farm water pumping"
        ]
      },
      {
        "topic_id": "fp_biofuels_biogas",
        "topic_name": "Biofuels, Biogas & Producer Gas in Agriculture",
        "subtopics": [
          "Biodiesel transesterification and properties",
          "Biogas production and anaerobic digester sizing",
          "Producer gas gasifiers and engine dual-fuel operation"
        ]
      },
      {
        "topic_id": "fp_air_cycles",
        "topic_name": "Thermodynamic Air Cycles: Otto, Diesel & Dual",
        "subtopics": [
          "Air-standard Otto cycle efficiency",
          "Air-standard Diesel cycle and cut-off ratio",
          "Dual combustion cycle",
          "Comparison of cycles for given compression ratio"
        ]
      },
      {
        "topic_id": "fp_combustion_knocking",
        "topic_name": "Engine Combustion, Knocking & Detonation",
        "subtopics": [
          "Stages of combustion in SI and CI engines",
          "Octane rating and knocking in SI engines",
          "Cetane rating and diesel knock",
          "Delay period and combustion chamber design"
        ]
      },
      {
        "topic_id": "fp_fuels_lubricants",
        "topic_name": "Engine Fuels, Lubricants & Viscosity",
        "subtopics": [
          "Diesel and petrol properties (calorific value, density, flash point)",
          "Lubricating oil viscosity and SAE grades",
          "Lubricant additives and detergency"
        ]
      },
      {
        "topic_id": "fp_cooling_lubrication",
        "topic_name": "Engine Cooling & Lubrication Systems",
        "subtopics": [
          "Radiator sizing and thermosiphon vs forced circulation",
          "Thermostat valve operation",
          "Splash and pressurized lubrication systems",
          "Oil filter types"
        ]
      },
      {
        "topic_id": "fp_fuel_injection_governors",
        "topic_name": "Fuel Injection & Governor Systems",
        "subtopics": [
          "Inline and rotary fuel injection pumps",
          "Pintle and multi-hole fuel injector nozzles",
          "Injection timing and spray penetration",
          "Mechanical and hydraulic governors"
        ]
      },
      {
        "topic_id": "fp_valve_timing_kinematics",
        "topic_name": "Valve Timing, Firing Order & Engine Kinematics",
        "subtopics": [
          "Four-stroke and two-stroke valve timing diagrams",
          "Valve lead, lag and overlap",
          "Piston displacement, velocity and acceleration",
          "Firing order of multi-cylinder engines"
        ]
      },
      {
        "topic_id": "fp_power_measurements",
        "topic_name": "Engine Power: Indicated, Brake & Friction Power",
        "subtopics": [
          "Mean effective pressure and indicated power",
          "Prony brake and hydraulic dynamometers",
          "Morse test for multi-cylinder engines",
          "Mechanical efficiency"
        ]
      },
      {
        "topic_id": "fp_efficiencies_bsfc",
        "topic_name": "Specific Fuel Consumption & Engine Efficiencies",
        "subtopics": [
          "Brake Specific Fuel Consumption (BSFC)",
          "Indicated and brake thermal efficiencies",
          "Volumetric efficiency and supercharging",
          "Relative efficiency"
        ]
      },
      {
        "topic_id": "fp_heat_balance",
        "topic_name": "Engine Heat Balance & Testing",
        "subtopics": [
          "Heat equivalent of brake power",
          "Heat carried away by cooling water",
          "Heat lost in exhaust gases and radiation",
          "Heat balance sheet preparation"
        ]
      },
      {
        "topic_id": "fp_chassis_cg",
        "topic_name": "Tractor Chassis Mechanics & Center of Gravity",
        "subtopics": [
          "Location of center of gravity (suspension and weighbridge methods)",
          "Static weight distribution on front and rear axles",
          "Wheelbase and wheel tread"
        ]
      },
      {
        "topic_id": "fp_weight_transfer",
        "topic_name": "Tractor Dynamic Weight Transfer & Stability",
        "subtopics": [
          "Dynamic weight transfer during pulling",
          "Longitudinal and lateral stability of tractors",
          "Critical slope angle for overturning"
        ]
      },
      {
        "topic_id": "fp_traction_slip",
        "topic_name": "Traction Mechanics, Wheel Slip & Rolling Resistance",
        "subtopics": [
          "Wheel slip and travel reduction calculation",
          "Rolling resistance and coefficient of rolling resistance",
          "Tractive efficiency and drawbar pull",
          "Gross and net traction ratio"
        ]
      },
      {
        "topic_id": "fp_clutches_transmission",
        "topic_name": "Tractor Clutches, Transmission & PTO",
        "subtopics": [
          "Single and dual plate friction clutches",
          "Sliding mesh and synchromesh gearboxes",
          "Gear reduction ratio and travel speeds",
          "Standard PTO speeds (540 and 1000 rpm)"
        ]
      },
      {
        "topic_id": "fp_differential_steering",
        "topic_name": "Differential, Final Drive & Steering Systems",
        "subtopics": [
          "Differential gear operation and bevel gears",
          "Differential lock mechanism",
          "Final drive spur and planetary reductions",
          "Ackermann steering geometry"
        ]
      },
      {
        "topic_id": "fp_hydraulics_hitch",
        "topic_name": "Tractor Hydraulics & 3-Point Hitch Mechanics",
        "subtopics": [
          "Position control and draft control systems",
          "Mixed control and floating operation",
          "Virtual hitch point and line of pull",
          "Hydraulic pump and cylinder capacity"
        ]
      },
      {
        "topic_id": "fp_power_tillers_ergonomics",
        "topic_name": "Power Tillers, Ergonomics & Safety",
        "subtopics": [
          "Power tiller transmission and rotary tilling",
          "Operator vibration and noise exposure",
          "Roll-Over Protective Structures (ROPS)",
          "Seat suspension and human comfort"
        ]
      }
    ]
  },
  {
    "section_id": "section_4",
    "section_number": 4,
    "section_name": "Soil and Water Conservation Engineering",
    "full_title": "Section 4: Soil and Water Conservation Engineering",
    "code": "SWCE",
    "icon": "Waves",
    "weightage": "15-20 Marks",
    "topics": [
      # Broad official topics for legacy & PYQ parity
      {
        "topic_id": "fluid_mechanics",
        "topic_name": "Fluid Mechanics",
        "subtopics": [
          "Ideal and real fluids, properties of fluids",
          "Hydrostatic pressure and its measurement",
          "Continuity equation, kinematics and dynamics of flow",
          "Bernoulli's theorem",
          "Laminar and turbulent flow in pipes, Darcy–Weisbach and Hazen–Williams equations",
          "Flow through orifices, weirs and notches",
          "Flow in open channels",
          "Dimensional analysis – concepts of geometric dimensionless numbers"
        ]
      },
      {
        "topic_id": "soil_mechanics",
        "topic_name": "Soil Mechanics",
        "subtopics": [
          "Engineering properties of soils",
          "Fundamental definitions and relationships",
          "Index properties of soils",
          "Permeability and seepage analysis",
          "Shear strength",
          "Soil compaction and Proctor test",
          "Mohr's circle of stress",
          "Active and passive earth pressures",
          "Stability of slopes",
          "Terzaghi's one dimensional soil consolidation theory"
        ]
      },
      {
        "topic_id": "hydrology",
        "topic_name": "Hydrology",
        "subtopics": [
          "Hydrological cycle and measurement of its components",
          "Meteorological parameters and their measurement",
          "Analysis of precipitation data",
          "Runoff estimation",
          "Hydrograph analysis, unit hydrograph theory and application",
          "Stream flow measurement",
          "Flood routing, hydrological reservoir and channel routing",
          "Infiltration – indices and equations",
          "Drought and its classification"
        ]
      },
      {
        "topic_id": "surveying_and_levelling",
        "topic_name": "Surveying and Levelling",
        "subtopics": [
          "Measurement of distance and area",
          "Instruments for surveying and levelling",
          "Chain surveying, methods of traversing",
          "Measurement of angles and bearings",
          "Plane table surveying",
          "Types of levelling",
          "The Theodolite traversing",
          "Contouring",
          "Total station, introduction to GPS survey",
          "Computation of areas and volume"
        ]
      },
      {
        "topic_id": "soil_and_water_erosion",
        "topic_name": "Soil and Water Erosion",
        "subtopics": [
          "Mechanics of soil erosion – wind and water erosion",
          "Soil erosion types, factors affecting erosion",
          "Soil loss estimation",
          "Biological and engineering measures to control erosion",
          "Terraces and bunds",
          "Vegetative waterways",
          "Gully control structures – drop, drop inlet and chute spillways",
          "Earthen dams"
        ]
      },
      {
        "topic_id": "watershed_management",
        "topic_name": "Watershed Management",
        "subtopics": [
          "Watershed characterization and land use capability classification",
          "Water budgeting in watershed",
          "Rainwater harvesting",
          "Check dams and farm ponds"
        ]
      },
      # Granular Question Bank Topics
      {
        "topic_id": "swce_fluid_statics",
        "topic_name": "Fluid Statics, Pressure & Manometry",
        "subtopics": [
          "Fluid pressure and Pascal's law",
          "U-tube and differential manometers",
          "Hydrostatic force on submerged planar surfaces",
          "Center of pressure calculation"
        ]
      },
      {
        "topic_id": "swce_kinematics_bernoulli",
        "topic_name": "Dynamics of Flow & Bernoulli Equation",
        "subtopics": [
          "Continuity equation in 1D and 3D",
          "Euler's equation of motion along a streamline",
          "Bernoulli's theorem and energy grade lines",
          "Pitot tube and venturimeter flow measurement"
        ]
      },
      {
        "topic_id": "swce_pipe_flow",
        "topic_name": "Pipe Flow, Darcy-Weisbach & Minor Losses",
        "subtopics": [
          "Laminar vs turbulent pipe flow (Reynolds number)",
          "Darcy-Weisbach friction factor and Moody chart",
          "Minor losses in fittings, expansions and contractions",
          "Equivalent pipe and pipes in series/parallel"
        ]
      },
      {
        "topic_id": "swce_open_channel",
        "topic_name": "Open Channel Hydraulics & Manning Equation",
        "subtopics": [
          "Uniform flow in open channels",
          "Manning's and Chezy's equations",
          "Most economical rectangular and trapezoidal sections",
          "Hydraulic radius and bed slope"
        ]
      },
      {
        "topic_id": "swce_specific_energy_jump",
        "topic_name": "Specific Energy, Critical Flow & Hydraulic Jump",
        "subtopics": [
          "Specific energy diagram and critical depth calculation",
          "Froude number and flow regimes",
          "Sequent depths in hydraulic jump",
          "Energy loss in hydraulic jump"
        ]
      },
      {
        "topic_id": "swce_weirs_flumes",
        "topic_name": "Flow Measurement: Weirs, Flumes & Orifices",
        "subtopics": [
          "Flow through sharp-crested rectangular and triangular (V-notch) weirs",
          "Francis formula with end contractions",
          "Parshall flume and broad-crested weirs",
          "Orifice flow and coefficients of discharge"
        ]
      },
      {
        "topic_id": "swce_soil_phase_properties",
        "topic_name": "Soil Physical Properties & Phase Relationships",
        "subtopics": [
          "Three-phase soil system (air, water, solid)",
          "Void ratio, porosity and degree of saturation",
          "Water content and unit weights (bulk, dry, submerged)",
          "Particle size distribution and USDA soil texture triangle"
        ]
      },
      {
        "topic_id": "swce_permeability_seepage",
        "topic_name": "Soil Permeability, Seepage & Flow Nets",
        "subtopics": [
          "Darcy's law and coefficient of permeability",
          "Constant head and falling head permeameter tests",
          "Flow net construction and seepage discharge through earthen dams",
          "Uplift pressure and exit gradient"
        ]
      },
      {
        "topic_id": "swce_shear_strength",
        "topic_name": "Soil Shear Strength & Mohr-Coulomb Theory",
        "subtopics": [
          "Mohr-Coulomb failure criterion",
          "Cohesion and angle of internal friction",
          "Direct shear test and unconfined compression test",
          "Triaxial shear test (CD, CU, UU)"
        ]
      },
      {
        "topic_id": "swce_compaction_consolidation",
        "topic_name": "Soil Compaction, Consolidation & Earth Pressures",
        "subtopics": [
          "Standard and Modified Proctor compaction tests",
          "Optimum Moisture Content (OMC) and maximum dry density",
          "Terzaghi's 1D consolidation theory",
          "Rankine active and passive earth pressure theories"
        ]
      },
      {
        "topic_id": "swce_precipitation_rain_gauges",
        "topic_name": "Precipitation Analysis & Rain Gauges",
        "subtopics": [
          "Symons and recording rain gauges",
          "Arithmetic mean, Thiessen polygon and Isohyetal methods",
          "Double mass curve for precipitation data consistency",
          "Depth-Area-Duration (DAD) curves"
        ]
      },
      {
        "topic_id": "swce_infiltration_losses",
        "topic_name": "Infiltration, Evaporation & Hydrologic Losses",
        "subtopics": [
          "Horton's and Philip's infiltration equations",
          "Phi-index and W-index calculations",
          "Pan evaporation and pan coefficients",
          "Penman method for evapotranspiration"
        ]
      },
      {
        "topic_id": "swce_runoff_estimation",
        "topic_name": "Runoff Estimation: Rational & SCS-CN Methods",
        "subtopics": [
          "Rational method peak runoff formula",
          "Time of concentration (Kirpich formula)",
          "SCS Curve Number method",
          "Direct runoff and initial abstraction"
        ]
      },
      {
        "topic_id": "swce_hydrograph_analysis",
        "topic_name": "Hydrograph Analysis & Unit Hydrograph Theory",
        "subtopics": [
          "Hydrograph components and baseflow separation",
          "Unit Hydrograph (UH) assumptions and principles",
          "S-curve hydrograph and duration conversion",
          "Synthetic Unit Hydrograph (Snyder's method)"
        ]
      },
      {
        "topic_id": "swce_flood_routing",
        "topic_name": "Flood Routing & Drought Analysis",
        "subtopics": [
          "Muskingum channel flood routing",
          "Modified Puls reservoir routing",
          "Return period and flood frequency analysis (Gumbel's method)",
          "Meteorological, hydrological and agricultural drought indices"
        ]
      },
      {
        "topic_id": "swce_water_erosion_usle",
        "topic_name": "Water Erosion Mechanics & USLE",
        "subtopics": [
          "Raindrop splash and overland sheet erosion",
          "Rill and gully erosion development",
          "Universal Soil Loss Equation (USLE) factors (R, K, LS, C, P)",
          "Revised USLE (RUSLE) and permissible soil loss"
        ]
      },
      {
        "topic_id": "swce_gully_spillways",
        "topic_name": "Gully Control Structures & Drop Spillways",
        "subtopics": [
          "Temporary gully control structures (brushwood, loose rock dams)",
          "Permanent drop spillway components (inlet, conduit, outlet)",
          "Hydraulic design of straight drop spillway crest",
          "Chute spillway and drop inlet spillway"
        ]
      },
      {
        "topic_id": "swce_terraces_bunds",
        "topic_name": "Terraces, Bunds & Vegetative Waterways",
        "subtopics": [
          "Contour bunds and graded bunds design",
          "Broad-base and bench terraces",
          "Parabolic and trapezoidal grassed waterways",
          "Maximum permissible flow velocity in waterways"
        ]
      },
      {
        "topic_id": "swce_watershed_harvesting",
        "topic_name": "Watershed Management & Rainwater Harvesting",
        "subtopics": [
          "Watershed morphometric parameters (bifurcation ratio, drainage density)",
          "Water budgeting in micro-watersheds",
          "Farm pond design and lining materials",
          "Check dams and percolation tanks"
        ]
      },
      {
        "topic_id": "swce_surveying_angles",
        "topic_name": "Surveying: Distance, Angles & Traversing",
        "subtopics": [
          "Chain and tape surveying, correction for pull, sag and temperature",
          "Prismatic compass and whole circle bearings",
          "Local attraction correction",
          "Theodolite traversing and latitudes/departures"
        ]
      },
      {
        "topic_id": "swce_levelling_contouring",
        "topic_name": "Levelling, Contouring & Earthwork Volume",
        "subtopics": [
          "Height of Instrument (HI) and Rise & Fall methods",
          "Reciprocal levelling and curvature/refraction corrections",
          "Contour lines, characteristics and contour intervals",
          "Trapezoidal and Prismoidal volume computation"
        ]
      }
    ]
  },
  {
    "section_id": "section_5",
    "section_number": 5,
    "section_name": "Irrigation and Drainage Engineering",
    "full_title": "Section 5: Irrigation and Drainage Engineering",
    "code": "IDE",
    "icon": "Droplets",
    "weightage": "12-15 Marks",
    "topics": [
      # Broad official topics for legacy & PYQ parity
      {
        "topic_id": "soil-water-plant_relationship",
        "topic_name": "Soil-Water-Plant Relationship",
        "subtopics": [
          "Water requirement of crops",
          "Consumptive use and evapotranspiration",
          "Measurement of infiltration, soil moisture and irrigation water infiltration"
        ]
      },
      {
        "topic_id": "irrigation_water_conveyance_and_application_methods",
        "topic_name": "Irrigation Water Conveyance and Application Methods",
        "subtopics": [
          "Design of irrigation channels and underground pipelines",
          "Irrigation scheduling",
          "Surface, sprinkler and micro irrigation methods",
          "Design and evaluation of irrigation methods",
          "Irrigation efficiencies"
        ]
      },
      {
        "topic_id": "agricultural_drainage",
        "topic_name": "Agricultural Drainage",
        "subtopics": [
          "Drainage coefficient",
          "Planning, design and layout of surface and sub-surface drainage systems",
          "Leaching requirement and salinity control",
          "Irrigation and drainage water quality and reuse",
          "Non-conventional drainage system"
        ]
      },
      {
        "topic_id": "groundwater_hydrology",
        "topic_name": "Groundwater Hydrology",
        "subtopics": [
          "Groundwater occurrence",
          "Groundwater movement; Darcy's Law",
          "Steady and unsteady flow in confined and unconfined aquifers",
          "Groundwater exploration techniques",
          "Overview of groundwater recharge estimation and artificial recharge techniques"
        ]
      },
      {
        "topic_id": "wells_and_pumps",
        "topic_name": "Wells and Pumps",
        "subtopics": [
          "Types of wells",
          "Steady flow through wells",
          "Design and construction of water wells",
          "Classification of pumps",
          "Pump characteristics",
          "Pump selection and installation"
        ]
      },
      # Granular Question Bank Topics
      {
        "topic_id": "ide_soil_water_plant",
        "topic_name": "Soil-Water-Plant Relations & Soil Moisture Constants",
        "subtopics": [
          "Saturation capacity, Field Capacity (FC) and Permanent Wilting Point (PWP)",
          "Available Water Capacity (AWC) and Management Allowed Depletion (MAD)",
          "Soil moisture tension and pF curves",
          "Tensiometers and gypsum blocks"
        ]
      },
      {
        "topic_id": "ide_et_crop_water",
        "topic_name": "Evapotranspiration, Consumptive Use & Crop Water Needs",
        "subtopics": [
          "Reference crop evapotranspiration (ETo)",
          "Crop coefficients (Kc) and crop evapotranspiration (ETc)",
          "Blaney-Criddle and Modified Penman methods",
          "Net and gross irrigation requirements"
        ]
      },
      {
        "topic_id": "ide_irrigation_scheduling",
        "topic_name": "Irrigation Scheduling & Soil Moisture Depletion",
        "subtopics": [
          "Soil moisture depletion approach",
          "Irrigation interval and depth of water application",
          "Critical crop growth stages",
          "Canopy temperature and infrared thermometry"
        ]
      },
      {
        "topic_id": "ide_surface_irrigation",
        "topic_name": "Surface Irrigation: Border, Furrow & Basin Hydraulics",
        "subtopics": [
          "Border strip design, advance and recession phases",
          "Furrow spacing, slope and cutback irrigation",
          "Check basin sizing and infiltration characteristics"
        ]
      },
      {
        "topic_id": "ide_sprinkler_design",
        "topic_name": "Sprinkler Irrigation Design & Distribution Uniformity",
        "subtopics": [
          "Operating pressure and discharge of sprinkler nozzles",
          "Christiansen's Uniformity Coefficient (Cu)",
          "Lateral and mainline hydraulic pipe design",
          "Application rate vs soil infiltration rate"
        ]
      },
      {
        "topic_id": "ide_drip_micro_design",
        "topic_name": "Drip / Micro-Irrigation Design & Emitters",
        "subtopics": [
          "Emitter discharge and flow exponent",
          "Emission uniformity (EU) and manufacturer's coefficient of variation (Cv)",
          "Submain and lateral design (multiple outlet pipeline)",
          "Fertigation injectors and filtration systems"
        ]
      },
      {
        "topic_id": "ide_irrigation_efficiencies",
        "topic_name": "Irrigation Efficiencies & Water Conveyance",
        "subtopics": [
          "Water conveyance efficiency (Ec)",
          "Water application efficiency (Ea)",
          "Water use and water storage efficiency",
          "Overall irrigation project efficiency"
        ]
      },
      {
        "topic_id": "ide_canal_design",
        "topic_name": "Canal Design: Lacey, Kennedy & Tractive Force",
        "subtopics": [
          "Kennedy's critical velocity theory",
          "Lacey's regime theory and silt factor formulas",
          "Critical tractive force and shear stress on bed/banks",
          "Canal lining materials and seepage reduction"
        ]
      },
      {
        "topic_id": "ide_surface_drainage",
        "topic_name": "Agricultural Drainage: Surface Drainage & Runoff Removal",
        "subtopics": [
          "Drainage coefficient (DC) and design discharge",
          "Parallel open ditch drainage systems",
          "Bedding systems for low permeability soils"
        ]
      },
      {
        "topic_id": "ide_subsurface_hooghoudt",
        "topic_name": "Subsurface Drainage: Hooghoudt & Steady-State Equations",
        "subtopics": [
          "Hooghoudt drain spacing equation with equivalent depth",
          "Drain spacing calculation for homogeneous soils",
          "Tile and corrugated perforated plastic drains",
          "Envelope/filter materials"
        ]
      },
      {
        "topic_id": "ide_salinity_leaching",
        "topic_name": "Leaching Requirement, Salinity & Drainage Water Quality",
        "subtopics": [
          "Electrical Conductivity (EC) of soil and irrigation water",
          "Leaching Requirement (LR) formula",
          "Sodium Adsorption Ratio (SAR) and Exchangeable Sodium Percentage (ESP)",
          "Residual Sodium Carbonate (RSC) and Boron hazards"
        ]
      },
      {
        "topic_id": "ide_groundwater_darcy",
        "topic_name": "Groundwater Occurrence, Aquifer Types & Darcy Law",
        "subtopics": [
          "Confined, unconfined and semi-confined (leaky) aquifers",
          "Storage coefficient (storativity) and specific yield",
          "Hydraulic conductivity (K) and transmissivity (T)",
          "Darcy's law applications"
        ]
      },
      {
        "topic_id": "ide_wells_steady_flow",
        "topic_name": "Steady Flow to Wells: Confined & Unconfined Aquifers",
        "subtopics": [
          "Thiem equation for confined aquifer steady radial flow",
          "Dupuit-Forchheimer equation for unconfined aquifers",
          "Radius of influence and well drawdown"
        ]
      },
      {
        "topic_id": "ide_wells_theis_jacob",
        "topic_name": "Unsteady Flow to Wells: Theis & Cooper-Jacob Solutions",
        "subtopics": [
          "Theis non-equilibrium well function W(u)",
          "Cooper-Jacob logarithmic straight-line approximation",
          "Pumping test data interpretation for T and S calculation",
          "Well recovery analysis"
        ]
      },
      {
        "topic_id": "ide_pumps_curves_affinity",
        "topic_name": "Centrifugal Pumps: Performance Curves & Affinity Laws",
        "subtopics": [
          "Total dynamic head (TDH) calculation",
          "Impeller types and specific speed classification",
          "Pump characteristic curves (Head vs Q, Power vs Q, Efficiency vs Q)",
          "Affinity laws for speed and impeller diameter changes"
        ]
      },
      {
        "topic_id": "ide_pumps_cavitation_npsh",
        "topic_name": "Pump Cavitation, NPSH & Installation",
        "subtopics": [
          "Cavitation mechanism and vapor pressure",
          "Available Net Positive Suction Head (NPSHa)",
          "Required NPSH (NPSHr) and cavitation margin",
          "Maximum permissible suction lift of pumps"
        ]
      }
    ]
  },
  {
    "section_id": "section_6",
    "section_number": 6,
    "section_name": "Agricultural Process Engineering",
    "full_title": "Section 6: Agricultural Process Engineering",
    "code": "APE",
    "icon": "Factory",
    "weightage": "12-15 Marks",
    "topics": [
      # Broad official topics for legacy & PYQ parity
      {
        "topic_id": "engineering_properties_of_agriculture_produce",
        "topic_name": "Engineering Properties of Agriculture Produce",
        "subtopics": [
          "Physical properties",
          "Thermal properties",
          "Frictional properties",
          "Rheological properties",
          "Electrical properties"
        ]
      },
      {
        "topic_id": "evaporation_and_drying",
        "topic_name": "Evaporation and Drying",
        "subtopics": [
          "Concentration and drying of liquid foods – evaporators, tray, drum and spray dryers",
          "Osmotic dehydration and freeze drying",
          "Hydrothermal treatments",
          "Drying and milling of cereals, pulses and oilseeds",
          "Drying kinetics",
          "Psychrometry – properties of air-water vapour mixture"
        ]
      },
      {
        "topic_id": "size_reduction_and_material_handling",
        "topic_name": "Size Reduction and Material Handling",
        "subtopics": [
          "Mechanics and energy requirement in size reduction of agriculture produce",
          "Particle size analysis for comminuted solids",
          "Size separation by screening",
          "Fluidization of granular solids – pneumatic, bucket, screw and belt conveying",
          "Cleaning and grading",
          "Effectiveness of separation",
          "Centrifugal separation of solids, liquids and gases",
          "Homogenization",
          "Filtration and membrane separation"
        ]
      },
      {
        "topic_id": "processing_of_agriculture_produce",
        "topic_name": "Processing of Agriculture Produce",
        "subtopics": [
          "Processing of seeds, spices, fruits and vegetables",
          "Value addition of agriculture produce"
        ]
      },
      {
        "topic_id": "storage_systems",
        "topic_name": "Storage Systems",
        "subtopics": [
          "Controlled and modified atmosphere storage",
          "Perishable food storage",
          "Godowns, bins and grain silos",
          "Packaging material and machines"
        ]
      },
      # Granular Question Bank Topics
      {
        "topic_id": "ape_physical_geometric",
        "topic_name": "Physical & Geometric Properties of Agro-Produce",
        "subtopics": [
          "Major, intermediate and minor axes of seeds",
          "Sphericity and roundness calculations",
          "Bulk density, true density and porosity relationships",
          "1000-grain weight"
        ]
      },
      {
        "topic_id": "ape_thermal_optical",
        "topic_name": "Thermal, Optical & Electrical Properties of Grains",
        "subtopics": [
          "Specific heat and thermal conductivity of food grains",
          "Thermal diffusivity calculation",
          "Dielectric constant and microwave heating",
          "Optical reflectance and sorting"
        ]
      },
      {
        "topic_id": "ape_frictional_rheology",
        "topic_name": "Frictional & Rheological Properties of Biological Materials",
        "subtopics": [
          "Static and kinetic coefficient of friction on steel/wood",
          "Angle of repose (emptying and filling)",
          "Stress relaxation and creep compliance",
          "Modulus of elasticity and rupture force"
        ]
      },
      {
        "topic_id": "ape_psychrometry",
        "topic_name": "Psychrometry & Moist Air Thermodynamics",
        "subtopics": [
          "Dry bulb, wet bulb and dew point temperatures",
          "Humidity ratio (specific humidity) and relative humidity",
          "Psychrometric chart processes (heating, cooling, humidification)",
          "Enthalpy of moist air"
        ]
      },
      {
        "topic_id": "ape_drying_kinetics",
        "topic_name": "Grain Drying Principles & Thin Layer Models",
        "subtopics": [
          "Constant rate and falling rate drying periods",
          "Moisture content dry basis vs wet basis conversion",
          "Page's thin layer drying equation",
          "Lewis exponential drying model"
        ]
      },
      {
        "topic_id": "ape_dryers_deep_bed",
        "topic_name": "Commercial Dryers & Deep Bed Drying Systems",
        "subtopics": [
          "Tray, fluidized bed and spouted bed dryers",
          "LSU and Baffle continuous grain dryers",
          "Deep bed drying front and moisture gradient",
          "Rotary and drum dryers"
        ]
      },
      {
        "topic_id": "ape_emc_isotherms",
        "topic_name": "Equilibrium Moisture Content & Sorption Isotherms",
        "subtopics": [
          "Equilibrium Moisture Content (EMC) concepts",
          "Modified Henderson and Chung-Pfost equations",
          "BET and GAB multi-layer sorption isotherms",
          "Sorption hysteresis"
        ]
      },
      {
        "topic_id": "ape_evaporators",
        "topic_name": "Evaporation & Liquid Food Concentration",
        "subtopics": [
          "Single-effect evaporator mass and energy balance",
          "Multiple-effect evaporators and steam economy",
          "Forward, backward and parallel feed arrangements",
          "Boiling point elevation (Duhring's rule)"
        ]
      },
      {
        "topic_id": "ape_size_reduction",
        "topic_name": "Size Reduction Mechanics & Energy Laws",
        "subtopics": [
          "Rittinger's law of surface area creation",
          "Kick's law of volume reduction",
          "Bond's law and work index calculation",
          "Hammer mills, attrition mills and roller crushers"
        ]
      },
      {
        "topic_id": "ape_particle_size_fineness",
        "topic_name": "Particle Size Analysis & Fineness Modulus",
        "subtopics": [
          "Tyler standard sieve series",
          "Fineness modulus (FM) calculation",
          "Average particle diameter formula",
          "Rosin-Rammler size distribution"
        ]
      },
      {
        "topic_id": "ape_screening_cleaning",
        "topic_name": "Screening, Cleaning & Grading (Screen Effectiveness)",
        "subtopics": [
          "Screen effectiveness and recovery calculation",
          "Air screen cleaners and aspiration",
          "Specific gravity separators",
          "Indented cylinder and disc separators"
        ]
      },
      {
        "topic_id": "ape_material_handling",
        "topic_name": "Material Handling: Belt, Screw & Bucket Conveyors",
        "subtopics": [
          "Flat and troughed belt conveyor capacity and power",
          "Screw conveyor pitch, diameter and power requirement",
          "Bucket elevator capacity and discharge types (centrifugal, continuous)"
        ]
      },
      {
        "topic_id": "ape_pneumatic_fluidization",
        "topic_name": "Pneumatic Conveying & Fluidization of Solids",
        "subtopics": [
          "Dilute phase and dense phase pneumatic conveying",
          "Choking and saltation velocities",
          "Minimum fluidization velocity (Ergun equation)",
          "Pressure drop in pneumatic lines"
        ]
      },
      {
        "topic_id": "ape_grain_storage_silos",
        "topic_name": "Grain Storage: Silos, Bins & Pressure Distribution",
        "subtopics": [
          "Shallow bin vs deep bin criteria",
          "Janssen's equation for lateral and vertical grain pressures",
          "Airy's grain pressure theory",
          "Thermal insulation of grain silos"
        ]
      },
      {
        "topic_id": "ape_milling_parboiling",
        "topic_name": "Rice Milling, Parboiling & Pulse Processing",
        "subtopics": [
          "Modern rice mill unit operations (destoning, dehusking, polishing)",
          "Parboiling hydrothermal treatment and gelatinization",
          "Head rice yield and milling recovery",
          "Dhal milling and pigeon pea conditioning"
        ]
      }
    ]
  },
  {
    "section_id": "section_7",
    "section_number": 7,
    "section_name": "Dairy and Food Engineering",
    "full_title": "Section 7: Dairy and Food Engineering",
    "code": "DFE",
    "icon": "Utensils",
    "weightage": "8-12 Marks",
    "topics": [
      # Broad official topics for legacy & PYQ parity
      {
        "topic_id": "heat_and_mass_transfer",
        "topic_name": "Heat and Mass Transfer",
        "subtopics": [
          "Steady state heat transfer in conduction, convection and radiation",
          "Transient heat transfer in simple geometry",
          "Working principles of heat exchangers",
          "Diffusive and convective mass transfer",
          "Simultaneous heat and mass transfer in agricultural processing operations",
          "Material and energy balances in food processing systems",
          "Water activity, sorption and desorption isotherms"
        ]
      },
      {
        "topic_id": "unit_operations_in_dairy_and_food_engineering",
        "topic_name": "Unit Operations in Dairy and Food Engineering",
        "subtopics": [
          "Blanching",
          "Homogenization",
          "Pasteurization",
          "Sterilization"
        ]
      },
      {
        "topic_id": "preservation_of_food",
        "topic_name": "Preservation of Food",
        "subtopics": [
          "Kinetics of microbial death – pasteurization and sterilization of milk and other liquid foods",
          "Preservation of food by cooling and freezing",
          "Refrigeration and cold storage basics and applications"
        ]
      },
      # Granular Question Bank Topics
      {
        "topic_id": "dfe_steady_conduction",
        "topic_name": "Steady-State Conduction & Shape Factors",
        "subtopics": [
          "Fourier's law of heat conduction",
          "1D conduction through composite flat walls",
          "Conduction through composite cylindrical pipes and insulation",
          "Critical radius of insulation"
        ]
      },
      {
        "topic_id": "dfe_transient_conduction",
        "topic_name": "Transient Heat Conduction & Lumped Capacity Analysis",
        "subtopics": [
          "Lumped capacity criteria (Biot number Bi < 0.1)",
          "Heating/cooling time of solid food bodies",
          "Heisler charts and infinite cylinder/slab conduction",
          "Fourier number"
        ]
      },
      {
        "topic_id": "dfe_convection_numbers",
        "topic_name": "Convective Heat Transfer & Dimensionless Numbers",
        "subtopics": [
          "Newton's law of cooling and convective heat transfer coefficient",
          "Reynolds (Re), Prandtl (Pr), Nusselt (Nu) numbers",
          "Forced convection correlation for laminar and turbulent tube flow",
          "Natural convection and Grashof (Gr) number"
        ]
      },
      {
        "topic_id": "dfe_radiation_heat",
        "topic_name": "Radiation Heat Transfer & Emissivity",
        "subtopics": [
          "Stefan-Boltzmann law and blackbody radiation",
          "Emissivity and gray body radiation exchange",
          "View factors (shape factors) and reciprocity theorem",
          "Radiation shields"
        ]
      },
      {
        "topic_id": "dfe_heat_exchangers_lmtd",
        "topic_name": "Heat Exchangers: LMTD & NTU-Effectiveness Methods",
        "subtopics": [
          "Log Mean Temperature Difference (LMTD) for parallel and counterflow",
          "Overall heat transfer coefficient (U) and fouling factors",
          "Number of Transfer Units (NTU) and effectiveness (epsilon) method",
          "Plate heat exchangers in dairy processing"
        ]
      },
      {
        "topic_id": "dfe_mass_transfer_fick",
        "topic_name": "Mass Transfer, Fick's Law & Convective Diffusion",
        "subtopics": [
          "Fick's first and second laws of steady and transient diffusion",
          "Mass transfer coefficients and convective mass transfer",
          "Sherwood (Sh) and Schmidt (Sc) numbers",
          "Evaporative cooling mass transfer"
        ]
      },
      {
        "topic_id": "dfe_food_rheology",
        "topic_name": "Food Rheology & Non-Newtonian Flow",
        "subtopics": [
          "Newton's law of viscosity and Newtonian liquids (milk, clarified juice)",
          "Power law (Ostwald-de Waele) fluids: pseudoplastic and dilatant",
          "Bingham plastic fluids and yield stress",
          "Consistency index (K) and flow behavior index (n)"
        ]
      },
      {
        "topic_id": "dfe_microbial_kinetics",
        "topic_name": "Microbial Inactivation Kinetics: D-Value, z-Value & F-Value",
        "subtopics": [
          "First-order microbial death kinetics",
          "Decimal reduction time (D-value) definition and calculation",
          "Thermal resistance constant (z-value)",
          "Thermal death time and F0 value (12D process for C. botulinum)"
        ]
      },
      {
        "topic_id": "dfe_milk_pasteurization",
        "topic_name": "Milk Pasteurization: HTST & Batch Systems",
        "subtopics": [
          "Low Temperature Long Time (LTLT) batch pasteurization",
          "High Temperature Short Time (HTST) pasteurizer components",
          "Flow Diversion Valve (FDV) and regeneration efficiency",
          "Alkaline phosphatase test"
        ]
      },
      {
        "topic_id": "dfe_thermal_sterilization",
        "topic_name": "Thermal Sterilization, Retort Processing & 12D Concept",
        "subtopics": [
          "Batch and continuous hydrostatic retorts",
          "General method of thermal process calculation (Bigelow method)",
          "Cook value (C-value) and nutrient retention",
          "Aseptic packaging and UHT steam infusion/injection"
        ]
      },
      {
        "topic_id": "dfe_dairy_equipment",
        "topic_name": "Dairy Processing Equipment: Homogenizers & Cream Separators",
        "subtopics": [
          "Two-stage high-pressure homogenization mechanics",
          "Cream separator disc stack kinematics and separation efficiency",
          "Butter churn and continuous butter making",
          "Evaporated and sweetened condensed milk processing"
        ]
      },
      {
        "topic_id": "dfe_freezing_plank",
        "topic_name": "Food Freezing, Plank's Equation & Freezing Time",
        "subtopics": [
          "Freezing point depression of liquid foods",
          "Plank's equation for freezing time of slabs, cylinders and spheres",
          "Latent heat of freezing and unfreezable water",
          "Air blast, contact plate and cryogenic freezers"
        ]
      },
      {
        "topic_id": "dfe_refrigeration_cold_storage",
        "topic_name": "Refrigeration Cycles, Refrigerants & Cold Storage Design",
        "subtopics": [
          "Vapor compression refrigeration cycle (p-h and T-s diagrams)",
          "Coefficient of Performance (COP) and compressor work",
          "Heat load calculation of cold storage rooms (transmission, product, infiltration)",
          "Eco-friendly refrigerants and GWP/ODP"
        ]
      },
      {
        "topic_id": "dfe_water_activity_packaging",
        "topic_name": "Water Activity & Food Packaging",
        "subtopics": [
          "Water activity (aw) definition and microbial growth limits",
          "Moisture sorption isotherms and monolayer moisture (BET equation)",
          "Equilibrium relative humidity",
          "Food packaging barrier properties (WVTR, OTR)"
        ]
      }
    ]
  },
  {
    "section_id": "section_8",
    "section_number": 8,
    "section_name": "General Aptitude",
    "full_title": "Section 8: General Aptitude",
    "code": "GA",
    "icon": "Brain",
    "weightage": "15 Marks",
    "topics": [
      # Broad official topics for legacy & PYQ parity
      {
        "topic_id": "verbal_aptitude",
        "topic_name": "Verbal Aptitude",
        "subtopics": [
          "Basic English Grammar & Vocabulary",
          "Reading Comprehension",
          "Critical Reasoning"
        ]
      },
      {
        "topic_id": "quantitative_aptitude",
        "topic_name": "Quantitative Aptitude",
        "subtopics": [
          "Data Interpretation",
          "Numerical Computation",
          "Ratios & Percentages"
        ]
      },
      {
        "topic_id": "analytical_spatial_aptitude",
        "topic_name": "Analytical & Spatial Aptitude",
        "subtopics": [
          "Logic Deduction & Pattern Recognition",
          "Spatial Reasoning & 3D Representations"
        ]
      },
      # Granular Question Bank Topics
      {
        "topic_id": "ga_percentages_ratios",
        "topic_name": "Quantitative: Percentages, Profit-Loss, Ratios & Averages",
        "subtopics": [
          "Percentage increase/decrease and successive changes",
          "Profit, loss, discount and marked price",
          "Ratio, proportion and partnerships",
          "Weighted averages and mixtures/alligations"
        ]
      },
      {
        "topic_id": "ga_time_work_speed",
        "topic_name": "Quantitative: Time, Work, Speed, Distance & Pipes",
        "subtopics": [
          "Work and time efficiency",
          "Pipes and cisterns filling/emptying",
          "Speed, distance and relative speed",
          "Trains crossing platforms/trains",
          "Boats and streams"
        ]
      },
      {
        "topic_id": "ga_algebra_progressions",
        "topic_name": "Quantitative: Algebra, Functions & Progressions",
        "subtopics": [
          "Linear and quadratic equations",
          "Arithmetic Progressions (AP) and Geometric Progressions (GP)",
          "Logarithms and exponential functions",
          "Inequalities and absolute values"
        ]
      },
      {
        "topic_id": "ga_geometry_mensuration",
        "topic_name": "Quantitative: Geometry, Mensuration & Coordinate Geometry",
        "subtopics": [
          "Triangles, circles and polygons theorems",
          "Perimeter, surface area and volume of 2D/3D solids",
          "Trigonometric ratios and heights/distances",
          "Coordinate geometry and straight lines"
        ]
      },
      {
        "topic_id": "ga_permutations_probability",
        "topic_name": "Quantitative: Permutations, Combinations & Probability",
        "subtopics": [
          "Fundamental counting principle",
          "Permutations of distinct and identical items",
          "Combinations and selection problems",
          "Classical probability and independent events"
        ]
      },
      {
        "topic_id": "ga_data_interpretation",
        "topic_name": "Quantitative: Data Interpretation (Tables, Bar & Pie Charts)",
        "subtopics": [
          "Tabular data analysis and percentage share",
          "Bar charts and line graph trend analysis",
          "Pie charts angle-to-percentage conversion",
          "Multi-variable data comparison"
        ]
      },
      {
        "topic_id": "ga_series_coding",
        "topic_name": "Analytical: Number Series, Letter Patterns & Codes",
        "subtopics": [
          "Arithmetic, geometric and difference-of-difference series",
          "Letter sequences and alphabet positioning",
          "Coding-decoding by shifting and substitution",
          "Odd-man-out identification"
        ]
      },
      {
        "topic_id": "ga_syllogisms_deduction",
        "topic_name": "Analytical: Syllogisms, Deduction & Venn Diagrams",
        "subtopics": [
          "Categorical syllogisms (All, Some, No)",
          "Venn diagram set intersection and union",
          "Logical deductions and truth-value tables",
          "Statement and assumptions"
        ]
      },
      {
        "topic_id": "ga_relations_arrangements",
        "topic_name": "Analytical: Blood Relations, Direction Sense & Seating Arrangements",
        "subtopics": [
          "Family tree diagrams and relation decoding",
          "Compass directions and distance travelled",
          "Linear seating arrangements (single/double row)",
          "Circular seating arrangements facing center/outside"
        ]
      },
      {
        "topic_id": "ga_spatial_folding_projections",
        "topic_name": "Spatial: 2D/3D Paper Folding, Assembly & Projections",
        "subtopics": [
          "Paper folding and punched hole unfolding",
          "2D shape assembly and tessellation",
          "3D cube folding from cross nets",
          "Orthographic projections (front, side, top views)"
        ]
      },
      {
        "topic_id": "ga_grammar_vocabulary",
        "topic_name": "Verbal: English Grammar, Syntax & Vocabulary",
        "subtopics": [
          "Subject-verb agreement rules",
          "Tenses and conditional clauses",
          "Prepositions, articles and conjunctions",
          "Synonyms, antonyms and word analogies"
        ]
      },
      {
        "topic_id": "ga_critical_reading",
        "topic_name": "Verbal: Critical Reasoning & Reading Comprehension",
        "subtopics": [
          "Identifying main idea and central theme",
          "Drawing valid logical inferences",
          "Strengthening and weakening arguments",
          "Fact vs opinion evaluation"
        ]
      }
    ]
  }
]

# Write official_syllabus.json (array without extra React fields)
official_json = []
for sec in TAXONOMY:
  official_json.append({
    "section_id": sec["section_id"],
    "section_number": sec["section_number"],
    "section_name": sec["section_name"],
    "full_title": sec["full_title"],
    "topics": sec["topics"]
  })

with open("src/data/official_syllabus.json", "w", encoding="utf-8") as f:
  json.dump(official_json, f, indent=2, ensure_ascii=False)

# Write syllabus.js (GATE_AG_SYLLABUS)
syllabus_js_items = []
for sec in TAXONOMY:
  syllabus_js_items.append({
    "id": f"sec-{sec['section_number']}",
    "title": sec["full_title"],
    "code": sec["code"],
    "icon": sec["icon"],
    "weightage": sec["weightage"],
    "topics": sec["topics"]
  })

js_content = "export const GATE_AG_SYLLABUS = " + json.dumps(syllabus_js_items, indent=2, ensure_ascii=False) + ";\n"
with open("src/data/syllabus.js", "w", encoding="utf-8") as f:
  f.write(js_content)

print(f"Taxonomy updated successfully: {len(TAXONOMY)} sections, {sum(len(s['topics']) for s in TAXONOMY)} total topics across all sections.")
