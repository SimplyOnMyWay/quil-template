(ns {{top/ns}}.{{main/ns}}
    (:require
     [{{top/ns}}.randomutils :as r]
     [quil.core :as q :include-macros true]
     [quil.middleware :as m]
     [{{top/ns}}.dynamic :as dynamic]))

(defn ^:export run-sketch []
  (q/defsketch {{main/ns}}
    :host "{{main/ns}}"
    :size [925 925]
    :renderer :p2d
    :setup dynamic/setup
    :update dynamic/update-state
    :draw dynamic/draw
    :middleware [m/fun-mode]))


