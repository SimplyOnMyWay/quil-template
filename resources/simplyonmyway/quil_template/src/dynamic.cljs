(ns simplyonmyway.dynamic
  (:require
   [quil.core :as q :include-macros true]
   [simplyonmyway.randomutils :as r]))

(defn w
  ([val] (* (q/width) val))
  ([] (* (w 1.0))))

(defn h
  ([val] (* (q/height) val))
  ([] (* (h 1.0))))

(defn hw
  [p]
  [(w (p 0)) (h (p 1))])

(def R (new r/random))

(defn gauss
  ([mean sd]
   (.random_gaussian R mean sd))
  ([]
   (gauss 0 1)))

(defn random-int
  ([l u]
   (.random_int R l u))
  ([u]
   (.random_int R 0 u)))

(defn pareto
 [l u shape]
  (.random_pareto_bounded R l u shape))

(def phi (/ (+ 1 (.sqrt js/Math 5)) 2)) ;;golden ratio

(def PI (.-PI js/Math))

(defn setup
  []
  (q/color-mode :hsb 360 100 100 1.0)
  (q/no-fill)
  (q/no-stroke))

(defn update-state
  [state])

(defn draw
  [state]
  (q/no-loop)
  (apply q/background [0 30 70 1.0])
  (comment)
  (q/with-fill [180 20 20 0.68]
    (q/ellipse (w 0.5) (h 0.5) (w 0.68) (h 0.68))))
